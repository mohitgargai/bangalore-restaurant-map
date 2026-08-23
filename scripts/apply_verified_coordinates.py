import json
import re

UPDATES = {
    # 1. HERITAGE & BREAKFAST
    "vidyarthi-bhavan": {
        "googleMapsUrl": "https://maps.app.goo.gl/raSwapAJGqNuZFBQ7",
        "lat": 12.9404,
        "lng": 77.5739
    },
    "ctr-shri-sagar": {
        "googleMapsUrl": "https://maps.app.goo.gl/BarNJ8jbK1MsDpqPA",
        "lat": 13.0035,
        "lng": 77.5645
    },
    "veena-stores-malleshwaram": {
        "googleMapsUrl": "https://maps.app.goo.gl/j2J7Fq5Psg4MBuRM6",
        "lat": 13.0076,
        "lng": 77.5683
    },
    "umesh-refreshments-seshadripuram": {
        "googleMapsUrl": "https://maps.app.goo.gl/zChEBFpBpzjCpSiQ7",
        "lat": 12.9897,
        "lng": 77.5759
    },
    "taaza-thindi-jayanagar": {
        "googleMapsUrl": "https://maps.app.goo.gl/PnbfyyaU2FrjDtjM8",
        "lat": 12.9304,
        "lng": 77.5838
    },
    "brahmins-coffee-bar": {
        "googleMapsUrl": "https://maps.app.goo.gl/aHppjCYm1s5xLa4S7",
        "lat": 12.9539,
        "lng": 77.5692
    },
    "mtr-lalbagh": {
        "googleMapsUrl": "https://maps.app.goo.gl/6ffmRt9CK8Hi9p3x9",
        "lat": 12.9552,
        "lng": 77.5856
    },
    "dwaraka-hotel-basavanagudi": {
        "googleMapsUrl": "https://maps.app.goo.gl/UtaYVZXcHRt873Ky9",
        "lat": 12.9427,
        "lng": 77.5673
    },
    "puliyogare-point-basavanagudi": {
        "googleMapsUrl": "https://maps.app.goo.gl/Gbz1MVJXVAbYrttk6",
        "lat": 12.9419,
        "lng": 77.5682
    },
    "sn-refreshments-jayanagar": {
        "googleMapsUrl": "https://maps.app.goo.gl/6NBu42Fw4oppReNbA",
        "lat": 12.9103,
        "lng": 77.5898
    },
    "airlines-hotel-lavelle-road": {
        "googleMapsUrl": "https://maps.app.goo.gl/rDvMB3SVkLJvrGs17",
        "lat": 12.9737,
        "lng": 77.5996
    },
    "koshys-st-marks-road": {
        "googleMapsUrl": "https://maps.app.goo.gl/N8rjbD3qRNwwdu8x8",
        "lat": 12.9768,
        "lng": 77.6016
    },
    "the-only-place-museum-road": {
        "googleMapsUrl": "https://maps.app.goo.gl/5XGyVFruErTnQeVp7",
        "lat": 12.9723,
        "lng": 77.6055
    },
    "rameshwaram-cafe-indiranagar": {
        "googleMapsUrl": "https://maps.app.goo.gl/7LtasYhEheDxutoE8",
        "lat": 12.9818,
        "lng": 77.6410
    },
    "new-krishna-bhavan-malleshwaram": {
        "googleMapsUrl": "https://www.google.com/maps/place/New+Krishna+Bhavan/@12.9931,77.5717,17z/",
        "lat": 12.9931,
        "lng": 77.5717
    },

    # 2. SPECIALTY CAFES & MODERN DINING
    "the-hole-in-the-wall-cafe": {
        "googleMapsUrl": "https://www.google.com/maps/place/The+Hole+in+the+Wall+Cafe/@12.93418,77.62575,17z",
        "lat": 12.93418,
        "lng": 77.62575,
        "branches": [
            {
                "id": "the-hole-in-the-wall-indiranagar",
                "name": "Indiranagar (12th Main)",
                "neighborhood": "Indiranagar",
                "address": "612, 12th Main Rd, 7th Cross, HAL 2nd Stage, Indiranagar, Bengaluru, Karnataka 560038",
                "lat": 12.9723,
                "lng": 77.6433,
                "googleMapsUrl": "https://www.google.com/maps/place/The+Hole+in+the+Wall+Cafe/@12.9723,77.6433,17z"
            }
        ]
    },
    "the-craftery-by-subko": {
        "googleMapsUrl": "https://www.google.com/maps/place/The+Craftery+BLR+by+Subko/@12.9298,77.6256,17z",
        "lat": 12.9298,
        "lng": 77.6256
    },
    "araku-coffee": {
        "googleMapsUrl": "https://www.google.com/maps/place/ARAKU+Coffee/@12.9715,77.6416,17z",
        "lat": 12.9715,
        "lng": 77.6416
    },
    "one-five-four-breakfast-club": {
        "googleMapsUrl": "https://www.google.com/maps/place/154+Breakfast+Club/@12.9328,77.6258,17z",
        "lat": 12.9328,
        "lng": 77.6258
    },
    "truffles-st-marks-road": {
        "googleMapsUrl": "https://www.google.com/maps/place/Truffles/@12.9735,77.6012,17z",
        "lat": 12.9735,
        "lng": 77.6012
    },
    "sunnys-lavelle-road": {
        "googleMapsUrl": "https://www.google.com/maps/place/Sunny's/@12.9712,77.5962,17z",
        "lat": 12.9712,
        "lng": 77.5962
    },
    "anjus-cafe-ranga-shankara": {
        "googleMapsUrl": "https://www.google.com/maps/place/Anju's+Cafe/@12.9093,77.5891,17z",
        "lat": 12.9093,
        "lng": 77.5891
    },
    "paris-panini-indiranagar": {
        "googleMapsUrl": "https://www.google.com/maps/place/Paris+Panini+-+Gourmet+Sandwiches+%26+Street+Food/@12.9712,77.6415,17z",
        "lat": 12.9712,
        "lng": 77.6415
    },
    "pizza-4ps-indiranagar": {
        "googleMapsUrl": "https://www.google.com/maps/place/Pizza+4P's+Indiranagar/@12.9701,77.6418,17z",
        "lat": 12.9701,
        "lng": 77.6418
    },
    "the-pizza-bakery-indiranagar": {
        "googleMapsUrl": "https://maps.app.goo.gl/ZPKGKREvrZH9Hz1t7",
        "lat": 12.9705,
        "lng": 77.6417,
        "branches": [
            {
                "id": "the-pizza-bakery-church-street",
                "name": "Church Street (Coconut Grove)",
                "neighborhood": "Church Street & MG Road",
                "address": "86, Coconut Grove, Church St, Ashok Nagar, Bengaluru, Karnataka 560001",
                "lat": 12.9748,
                "lng": 77.6074,
                "googleMapsUrl": "https://www.google.com/maps/place/The+Pizza+Bakery/@12.9748,77.6074,17z"
            }
        ]
    },
    "brik-oven-church-street": {
        "googleMapsUrl": "https://maps.app.goo.gl/kpCrGrspRHvrboP47",
        "lat": 12.9749,
        "lng": 77.6045
    },
    "lupa-mg-road": {
        "googleMapsUrl": "https://www.google.com/maps/place/LUPA/@12.9738,77.6119,17z",
        "lat": 12.9738,
        "lng": 77.6119
    },
    "toast-and-tonic-richmond": {
        "googleMapsUrl": "https://www.google.com/maps/place/Toast+%26+Tonic/@12.9686,77.6087,17z",
        "lat": 12.9686,
        "lng": 77.6087
    },
    "farmlore-bangalore": {
        "googleMapsUrl": "https://www.google.com/maps/place/Farmlore/@13.1235,77.6534,17z",
        "lat": 13.1235,
        "lng": 77.6534
    },
    "chinita-mexican-indiranagar": {
        "googleMapsUrl": "https://maps.app.goo.gl/BKhLqHroqTceyjNe9",
        "lat": 12.972314,
        "lng": 77.643922
    },
    "olive-beach-richmond-town": {
        "googleMapsUrl": "https://www.google.com/maps/place/Olive+Beach/@12.969612,77.606234,17z",
        "lat": 12.969612,
        "lng": 77.606234
    },
    "phurr-jayanagar": {
        "googleMapsUrl": "https://maps.app.goo.gl/JitVpDxCeZoekXPV8",
        "lat": 12.930418,
        "lng": 77.583812
    },

    # 3. PAN-ASIAN & COCKTAILS
    "naru-noodle-bar": {
        "googleMapsUrl": "https://goo.gl/maps/fvQ1PtZH67uLepdZ6",
        "lat": 12.95655,
        "lng": 77.59247
    },
    "kopitiam-lah-indiranagar": {
        "googleMapsUrl": "https://maps.app.goo.gl/5UngxsWjksJsEwv28",
        "lat": 12.97010,
        "lng": 77.63815
    },
    "phobidden-fruit-indiranagar": {
        "googleMapsUrl": "https://goo.gl/maps/J7voxkAiuUunVFDB6",
        "lat": 12.97160,
        "lng": 77.64360
    },
    "the-fatty-bao-indiranagar": {
        "googleMapsUrl": "https://maps.app.goo.gl/DXrqNyB9m1QCyg8M9",
        "lat": 12.97189,
        "lng": 77.64125
    },
    "burma-burma": {
        "googleMapsUrl": "https://www.google.com/maps/place/Burma+Burma+Restaurant+%26+Tea+Room+-+Indiranagar/@12.97160,77.64160,17z",
        "lat": 12.97160,
        "lng": 77.64160,
        "branches": [
            {
                "id": "burma-burma-brigade-road",
                "name": "Brigade Road (Forum Rex Walk)",
                "neighborhood": "Church Street & MG Road",
                "address": "Forum Rex Walk, Brigade Rd, Shanthala Nagar, Ashok Nagar, Bengaluru, Karnataka 560001",
                "lat": 12.97150,
                "lng": 77.60570,
                "googleMapsUrl": "https://www.google.com/maps/place/Burma+Burma+Restaurant+%26+Tea+Room+-+Brigade+Road/@12.97150,77.60570,17z"
            }
        ]
    },
    "lucky-chan-indiranagar": {
        "googleMapsUrl": "https://maps.app.goo.gl/zrDZou4oZ39uqHXJ9",
        "lat": 12.970406,
        "lng": 77.642764,
        "branches": [
            {
                "id": "lucky-chan-bellandur",
                "name": "Bellandur (The Bay, RMZ EcoWorld)",
                "neighborhood": "Whitefield & East BLR",
                "address": "The Bay, RMZ EcoWorld, Outer Ring Rd, Bellandur, Bengaluru, Karnataka 560103",
                "lat": 12.92579,
                "lng": 77.68670,
                "googleMapsUrl": "https://www.google.com/maps/place/Lucky+Chan+-+DimSum+%26+Sushi+Parlour/@12.925787,77.686695,17z"
            },
            {
                "id": "lucky-chan-forum-south",
                "name": "Kanakapura Rd (Forum South Bengaluru)",
                "neighborhood": "Jayanagar",
                "address": "3rd Floor, Forum South Bengaluru, Konanakunte Cross, Kanakapura Rd, Bengaluru, Karnataka 560062",
                "lat": 12.89450,
                "lng": 77.56450,
                "googleMapsUrl": "https://www.google.com/maps/place/Lucky+Chan+-+DimSum+%26+Sushi+Parlour/@12.89450,77.56450,17z"
            }
        ]
    },
    "mai-mai-indiranagar": {
        "googleMapsUrl": "https://maps.app.goo.gl/jwpeX1hETATH7nJXA",
        "lat": 12.97180,
        "lng": 77.64150
    },
    "baan-phadthai-indiranagar": {
        "googleMapsUrl": "https://www.google.com/maps/place/Baan+Phadthai+Indiranagar/@12.97020,77.63820,17z",
        "lat": 12.97020,
        "lng": 77.63820
    },
    "miso-sexy-indiranagar": {
        "googleMapsUrl": "https://www.google.com/maps/place/Miso+Sexy/@12.97150,77.64350,17z",
        "lat": 12.97150,
        "lng": 77.64350
    },
    "misu-st-marks-road": {
        "googleMapsUrl": "https://www.google.com/maps/place/Misu+-+Pan+Asian+Restaurant/@12.97230,77.60120,17z",
        "lat": 12.97230,
        "lng": 77.60120
    },
    "hae-kum-gang-ashok-nagar": {
        "googleMapsUrl": "https://www.google.com/maps/place/Hae+Kum+Gang/@12.97150,77.60650,17z",
        "lat": 12.97150,
        "lng": 77.60650
    },
    "soka-indiranagar": {
        "googleMapsUrl": "https://www.google.com/maps/place/Soka/@12.95550,77.63600,17z",
        "lat": 12.979910,
        "lng": 77.636777
    },
    "zlb-23-leela-palace": {
        "googleMapsUrl": "https://www.google.com/maps/place/ZLB23/@12.96060,77.64190,17z",
        "lat": 12.960620,
        "lng": 77.648430
    },
    "copitas-four-seasons": {
        "googleMapsUrl": "https://www.google.com/maps/place/Copitas/@13.01250,77.58780,17z",
        "lat": 13.019115,
        "lng": 77.585150
    },

    # 4. REGIONAL & COASTAL & MILITARY
    "karavalli-residency-road": {
        "googleMapsUrl": "https://www.google.com/maps/place/Karavalli/@12.969641,77.606323,17z",
        "lat": 12.969641,
        "lng": 77.606323
    },
    "shivaji-military-hotel-jayanagar": {
        "googleMapsUrl": "https://www.google.com/maps/place/Shivaji+Military+Hotel/@12.923412,77.584635,17z",
        "lat": 12.923412,
        "lng": 77.584635
    },
    "ranganna-military-jayanagar": {
        "googleMapsUrl": "https://goo.gl/maps/DLEdQ8Y4fKB6zYzq7",
        "lat": 12.927425,
        "lng": 77.581531
    },
    "anupams-coast-to-coast": {
        "googleMapsUrl": "https://www.google.com/maps/place/Anupam's+Coast+II+Coast/@12.973024,77.608018,17z",
        "lat": 12.973024,
        "lng": 77.608018
    },
    "maravanthe-coastal-indiranagar": {
        "googleMapsUrl": "https://maps.app.goo.gl/TGaPET9dzsoPHNxs6",
        "lat": 12.977824,
        "lng": 77.641215
    },
    "super-naati-mg-road": {
        "googleMapsUrl": "https://maps.app.goo.gl/gvDh2CsGiLpzRQXa9",
        "lat": 12.973888,
        "lng": 77.608888
    },
    "bengaluru-oota-company-halasuru": {
        "googleMapsUrl": "https://maps.app.goo.gl/hEELRpRd79nxk9Ym8",
        "lat": 12.973512,
        "lng": 77.625528
    },
    "meghana-foods-koramangala": {
        "googleMapsUrl": "https://goo.gl/maps/cCxWRFu3X1k1H9vS6",
        "lat": 12.934415,
        "lng": 77.616082
    },
    "mangalore-pearl-frazer-town": {
        "googleMapsUrl": "https://www.google.com/maps/place/Mangalore+Pearl/@12.998419,77.614526,17z",
        "lat": 12.998419,
        "lng": 77.614526
    },

    # 5. MICROBREWERIES & BAKERIES/DESSERTS
    "toit-brewpub": {
        "googleMapsUrl": "https://maps.app.goo.gl/MihMH7jUDSL25aE18",
        "lat": 12.9792,
        "lng": 77.6408
    },
    "windmills-craftworks-whitefield": {
        "googleMapsUrl": "https://maps.app.goo.gl/pWeFTXu6YEf9VQUe8",
        "lat": 12.9825,
        "lng": 77.7219
    },
    "arbor-brewing-company": {
        "googleMapsUrl": "https://maps.app.goo.gl/wK53bsJRH4Vai2Hs9",
        "lat": 12.9703,
        "lng": 77.6080
    },
    "the-biere-club-lavelle": {
        "googleMapsUrl": "https://www.google.com/maps/place/The+Biere+Club/@12.967817,77.5986153,17z",
        "lat": 12.9678,
        "lng": 77.5986
    },
    "geist-brewing-factory": {
        "googleMapsUrl": "https://www.google.com/maps/place/Geist+Brewing+Co.+-+Bhartiya+Mall/@13.083979,77.641766,17z",
        "lat": 13.0840,
        "lng": 77.6418
    },
    "bobs-bar-indiranagar": {
        "googleMapsUrl": "https://www.google.com/maps/place/Bob's+Bar/@12.9723,77.6436,17z",
        "lat": 12.9723,
        "lng": 77.6436
    },
    "pecos-rest-house-road": {
        "googleMapsUrl": "https://maps.app.goo.gl/jWm21ns64GQQb3ST8",
        "lat": 12.9734,
        "lng": 77.6056
    },
    "lavonne-cafe-indiranagar": {
        "googleMapsUrl": "https://maps.app.goo.gl/ChEYZELtwwZmz8H88",
        "lat": 12.9731,
        "lng": 77.6433
    },
    "amadora-ice-cream-indiranagar": {
        "googleMapsUrl": "https://www.google.com/maps/place/1182,+12th+Main+Rd,+HAL+2nd+Stage,+Indiranagar,+Bengaluru,+Karnataka+560038/@12.9705,77.6445,17z",
        "lat": 12.9705,
        "lng": 77.6445
    },
    "glens-bakehouse-lavelle": {
        "googleMapsUrl": "https://www.google.com/maps/place/Glen's+Bakehouse/@12.9730,77.5970,17z",
        "lat": 12.9730,
        "lng": 77.5970
    },
    "variar-bakery-rajajinagar": {
        "googleMapsUrl": "https://maps.app.goo.gl/e4cfp6SCjotuhANU7",
        "lat": 12.9902,
        "lng": 77.5532
    },
    "albert-bakery-frazer-town": {
        "googleMapsUrl": "https://maps.app.goo.gl/xRgiDBJioDAh8nvm6",
        "lat": 12.9966,
        "lng": 77.6142
    },
    "thoms-bakery-cox-town": {
        "googleMapsUrl": "https://maps.app.goo.gl/nXbc6k2vqUWpr2xu7",
        "lat": 12.9915,
        "lng": 77.6141
    },
    "vb-bakery-vv-puram": {
        "googleMapsUrl": "https://goo.gl/maps/XFaUnXNLLqgnq2hb7",
        "lat": 12.9531,
        "lng": 77.5768
    },
    "lakeview-milkbar-mg-road": {
        "googleMapsUrl": "https://maps.app.goo.gl/7dwvKNkEXHzarDRv6",
        "lat": 12.9744,
        "lng": 77.6078
    },
    "corner-house-residency-road": {
        "googleMapsUrl": "https://www.google.com/maps/place/Corner+House+Ice+Cream/@12.9719,77.6012,17z",
        "lat": 12.9719,
        "lng": 77.6012
    }
}

with open('scripts/build_verified_master.py', 'r') as f:
    content = f.read()

pattern = re.compile(r'ALL_MASTER_SPOTS = (\[.*?\])\n\n# Generate', re.DOTALL)
match = pattern.search(content)
if match:
    import ast
    spots = ast.literal_eval(match.group(1))
    
    updated_count = 0
    for s in spots:
        spot_id = s.get('id')
        if spot_id in UPDATES:
            up = UPDATES[spot_id]
            s['googleMapsUrl'] = up['googleMapsUrl']
            s['lat'] = up['lat']
            s['lng'] = up['lng']
            if 'branches' in up:
                s['branches'] = up['branches']
            updated_count += 1
        else:
            print(f'Warning: No update for {spot_id}')
            
    print(f'Applied verified updates to {updated_count} spots.')
    
    new_all_spots_code = "ALL_MASTER_SPOTS = " + json.dumps(spots, indent=4)
    new_all_spots_code = new_all_spots_code.replace("true", "True").replace("false", "False")
    
    new_content = content[:match.start(0)] + new_all_spots_code + "\n\n# Generate" + content[match.end(0):]
    with open('scripts/build_verified_master.py', 'w') as f:
        f.write(new_content)
        
    print('Updated scripts/build_verified_master.py successfully.')
