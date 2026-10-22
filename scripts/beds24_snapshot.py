"""Copia de precios y disponibilidad desde Beds24 para la maqueta.

Lee el calendario de la propiedad de prueba con un token de solo lectura
(secreto BEDS24_REFRESH_TOKEN) y escribe data/beds24.json. Beds24 recomienda
guardar copia de estos datos en lugar de consultarlos en cada visita.
"""
import datetime as dt
import json
import os
import pathlib
import sys
import urllib.error
import urllib.request

API = 'https://api.beds24.com/v2'
PROPERTY_ID = 362464
ROOMS = {'estudio': 747017, 'apartamento': 747018, 'duplex': 747019}
OUT = pathlib.Path(__file__).resolve().parent.parent / 'data' / 'beds24.json'
MONTHS_AHEAD = 18


def call(path, headers):
    req = urllib.request.Request(API + path, headers={'accept': 'application/json', **headers})
    try:
        with urllib.request.urlopen(req, timeout=40) as r:
            return json.load(r)
    except urllib.error.HTTPError as e:
        sys.exit(f'Beds24 {path.split("?")[0]} -> HTTP {e.code}: {e.read()[:200]!r}')


def main():
    refresh = os.environ.get('BEDS24_REFRESH_TOKEN')
    if not refresh:
        sys.exit('Falta BEDS24_REFRESH_TOKEN')
    token = call('/authentication/token', {'refreshToken': refresh})['token']

    start = dt.date.today()
    end = start + dt.timedelta(days=31 * MONTHS_AHEAD)
    cal = call(f'/inventory/rooms/calendar?propertyId={PROPERTY_ID}&startDate={start}&endDate={end}'
               '&includePrices=true&includeNumAvail=true&includeMinStay=true', {'token': token})
    props = call(f'/properties?id={PROPERTY_ID}&includeAllRooms=true', {'token': token})

    info = {}
    for p in props.get('data', []):
        for r in p.get('roomTypes', []):
            info[r['id']] = {'qty': r.get('qty'), 'max': r.get('maxPeople')}

    order = list(ROOMS)
    days = {}
    for room in cal.get('data', []):
        key = next((k for k, v in ROOMS.items() if v == room['roomId']), None)
        if key is None:
            continue
        i = order.index(key)
        for rng in room.get('calendar', []):
            d = dt.date.fromisoformat(rng['from'])
            last = dt.date.fromisoformat(rng['to'])
            while d <= last:
                row = days.setdefault(d.isoformat(), [None] * len(order))
                price = rng.get('price1')
                row[i] = [price, rng.get('numAvail', 0) if price else 0, rng.get('minStay', 1)]
                d += dt.timedelta(days=1)

    data = {
        'source': 'Beds24 API v2 · cuenta de prueba',
        'propertyId': PROPERTY_ID,
        'order': order,
        'rooms': {k: {'id': v, **info.get(v, {})} for k, v in ROOMS.items()},
        'days': dict(sorted(days.items())),
    }
    old = json.loads(OUT.read_text(encoding='utf-8')) if OUT.exists() else {}
    if {k: v for k, v in old.items() if k != 'updated'} == data:
        print('Sin cambios')
        return
    data['updated'] = dt.datetime.now(dt.timezone.utc).strftime('%Y-%m-%dT%H:%MZ')
    OUT.parent.mkdir(parents=True, exist_ok=True)
    OUT.write_text(json.dumps(data, separators=(',', ':')), encoding='utf-8')
    print(f'Escritos {len(days)} días')


if __name__ == '__main__':
    main()
