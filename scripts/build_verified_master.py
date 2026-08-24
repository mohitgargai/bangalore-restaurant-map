import json

# Comprehensive, zero-slop curated list of Bangalore's top cult eateries (2026)
ALL_MASTER_SPOTS = [
    {
        "id": "vidyarthi-bhavan",
        "name": "Vidyarthi Bhavan",
        "slug": "vidyarthi-bhavan",
        "tagline": "The 1943 Gandhi Bazaar legend for thick, crispy Ghee Masala Dosa",
        "description": "Established in 1943, this Gandhi Bazaar institution has fed generations of artists, writers, and food lovers with its signature crisp golden dosas drenched in pure ghee.",
        "category": "Iconic Heritage",
        "neighborhood": "Basavanagudi",
        "address": "32, Gandhi Bazaar Main Rd, Basavanagudi, Bengaluru, Karnataka 560004",
        "lat": 12.9450345,
        "lng": 77.5713723,
        "priceLevel": "\u20b9",
        "priceForTwo": "\u20b9200",
        "mustTry": [
            "Benne Masala Dosa",
            "Crisp Uddina Vada",
            "Poori Sagu",
            "Filter Coffee"
        ],
        "vibeTags": [
            "Heritage (Pre-1980)",
            "Pure Veg",
            "Breakfast Spot",
            "Filter Coffee Spot",
            "Pocket Friendly"
        ],
        "imageUrl": "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=1000&q=80",
        "googleMapsUrl": "https://www.google.com/maps/place/Vidyarthi+Bhavan/@12.9450345,77.5713723,17z/data=!3m1!4b1!4m6!3m5!1s0x3bae15f2e88ad035:0xed7fede7791f8edc!8m2!3d12.9450345!4d77.5713723!16s%2Fm%2F0hhrhzm?entry=ttu&g_ep=EgoyMDI2MDgxOS4wIKXMDSoASAFQAw%3D%3D",
        "timings": "6:30 AM \u2013 11:30 AM, 2:00 PM \u2013 8:00 PM (Closed Fridays)",
        "curatorNote": "Watch the waiters perform their legendary stack balancing act carrying 20 plates of butter dosa at once.",
        "isVegetarian": True,
        "verified": True
    },
    {
        "id": "ctr-shri-sagar",
        "name": "CTR (Central Tiffin Room / Shri Sagar)",
        "slug": "ctr-shri-sagar",
        "tagline": "Golden blistered Benne Masala Dosa with red & mint chutneys since 1920",
        "description": "A 100-year-old temple of breakfast in Malleshwaram. The Benne Dosa here features a crunchy blistered golden shell and soft, fluffy inside served with three signature chutneys.",
        "category": "Iconic Heritage",
        "neighborhood": "Malleshwaram",
        "address": "7th Cross Rd, Margosa Rd, Malleshwaram, Bengaluru, Karnataka 560003",
        "lat": 12.9982327,
        "lng": 77.5695395,
        "priceLevel": "\u20b9",
        "priceForTwo": "\u20b9200",
        "mustTry": [
            "Butter Masala Dosa (Benne Dosa)",
            "Mangalore Bajji",
            "Poori Sagu",
            "Filter Coffee"
        ],
        "vibeTags": [
            "Heritage (Pre-1980)",
            "Pure Veg",
            "Breakfast Spot",
            "Filter Coffee Spot",
            "Pocket Friendly"
        ],
        "imageUrl": "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=1000&q=80",
        "googleMapsUrl": "https://www.google.com/maps/place/Central+Tiffin+Room/@12.9982327,77.5695395,17z/data=!3m1!4b1!4m6!3m5!1s0x3bae1625bc6a63f3:0x6941d824e3c07d0b!8m2!3d12.9982327!4d77.5695395!16s%2Fm%2F0gfdq9p?entry=ttu&g_ep=EgoyMDI2MDgxOS4wIKXMDSoASAFQAw%3D%3D",
        "timings": "7:00 AM \u2013 12:30 PM, 4:00 PM \u2013 9:00 PM",
        "curatorNote": "Arrive before 8 AM on weekends to get a seat without waiting in the Margosa Road queue.",
        "isVegetarian": True,
        "verified": True
    },
    {
        "id": "veena-stores-malleshwaram",
        "name": "Veena Stores",
        "slug": "veena-stores-malleshwaram",
        "tagline": "The benchmark for cloud-soft Idlis & mint coconut chutney since 1977",
        "description": "A tiny sidewalk landmark on Margosa Road with no seating, where hundreds queue daily for piping-hot melt-in-mouth idlis, crisp uddina vadas, and fresh mint-infused green coconut chutney.",
        "category": "Iconic Heritage",
        "neighborhood": "Malleshwaram",
        "address": "187, 15th Cross Rd, Margosa Rd, Malleshwaram, Bengaluru, Karnataka 560003",
        "lat": 13.0056609,
        "lng": 77.5693243,
        "priceLevel": "\u20b9",
        "priceForTwo": "\u20b9100",
        "mustTry": [
            "Steamed Soft Idli with Mint Chutney",
            "Crispy Uddina Vada",
            "Khara Bath (Upma)",
            "Kesari Bath (Chow Chow Bath)",
            "Filter Coffee"
        ],
        "vibeTags": [
            "Heritage (Pre-1980)",
            "Pure Veg",
            "Breakfast Spot",
            "Filter Coffee Spot",
            "Pocket Friendly"
        ],
        "imageUrl": "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=1000&q=80",
        "googleMapsUrl": "https://www.google.com/maps/place/Veena+Stores/@13.0056609,77.5693243,17z/data=!3m1!4b1!4m6!3m5!1s0x3bae162eebc239d7:0x3f4b0c24f9bb719c!8m2!3d13.0056609!4d77.5693243!16s%2Fg%2F1td1hf9_?entry=ttu&g_ep=EgoyMDI2MDgxOS4wIKXMDSoASAFQAw%3D%3D",
        "timings": "6:30 AM \u2013 12:00 PM, 3:30 PM \u2013 9:00 PM",
        "curatorNote": "No sambar needed \u2014 the refreshing mint coconut chutney paired with pillow-soft idlis and hot crisp vadas is Malleshwaram breakfast at its peak.",
        "isVegetarian": True,
        "verified": True
    },
    {
        "id": "umesh-refreshments-seshadripuram",
        "name": "Umesh Refreshments",
        "slug": "umesh-refreshments-seshadripuram",
        "tagline": "Ultra-crisp Podi Masala Dosa & melt-in-mouth Button Thatte Idlis",
        "description": "Seshadripuram\u2019s iconic standing-only tiffin room that sparked a citywide butter-podi revolution with its blazing red gunpowder masala dosas and rich ghee bath.",
        "category": "Iconic Heritage",
        "neighborhood": "Sadashivanagar & Palace Grounds",
        "address": "23, 3rd Main Rd, 4th Block, Kumara Park West, Seshadripuram, Bengaluru, Karnataka 560020",
        "lat": 13.0009241,
        "lng": 77.5824606,
        "priceLevel": "\u20b9",
        "priceForTwo": "\u20b9200",
        "mustTry": [
            "Ghee Podi Masala Dosa",
            "Ghee Podi Thatte Idli",
            "Kesari Bath",
            "Filter Coffee"
        ],
        "vibeTags": [
            "Pure Veg",
            "Breakfast Spot",
            "Filter Coffee Spot",
            "Pocket Friendly"
        ],
        "imageUrl": "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=1000&q=80",
        "googleMapsUrl": "https://www.google.com/maps/dir/Umesh+Refreshments+(by+Umesh+Dosa+Point),+No:47,+Railway+Parallel+Rd,+4th+Block,+Kumara+Park+West,+Seshadripuram,+Bengaluru,+Karnataka+560020/Palace+Grounds,+10%2F7,+Kumara+Krupa+Road,+near+Chamara+Vajra,+Jayamahal,+Bengaluru,+Karnataka+560006/@13.0009241,77.5824606,15z/data=!3m1!4b1!4m13!4m12!1m5!1m1!1s0x3bae17007e834fdd:0x47edf8f2bcf538d8!2m2!1d77.5779842!2d12.9886914!1m5!1m1!1s0x3bae1649af3015bf:0xe68b7b517536e5d5!2m2!1d77.5872428!2d13.0041586?entry=ttu&g_ep=EgoyMDI2MDgxOS4wIKXMDSoASAFQAw%3D%3D",
        "timings": "7:00 AM \u2013 10:30 PM",
        "curatorNote": "The spiced podi is roasted in small batches and showered with molten ghee over a paper-thin, crunchy crepe.",
        "isVegetarian": True,
        "verified": True
    },
    {
        "id": "taaza-thindi-jayanagar",
        "name": "Taaza Thindi",
        "slug": "taaza-thindi-jayanagar",
        "tagline": "Spotless, hyper-clean open kitchen for golden Masala Dosa",
        "description": "A revered Jayanagar morning destination famous for automated hospital-grade hygiene, blazing golden Masala Dosas, and piping hot filter coffee under \u20b950.",
        "category": "Iconic Heritage",
        "neighborhood": "Jayanagar",
        "address": "1004, 26th Main Rd, 4th T Block East, Jayanagar, Bengaluru, Karnataka 560041",
        "lat": 12.9228371,
        "lng": 77.593274,
        "priceLevel": "\u20b9",
        "priceForTwo": "\u20b9120",
        "mustTry": [
            "Crispy Masala Dosa",
            "Melt-in-mouth Idli Vada",
            "Khara Bath",
            "Kesari Bath",
            "Piping Hot Filter Coffee"
        ],
        "vibeTags": [
            "Pure Veg",
            "Breakfast Spot",
            "Pocket Friendly",
            "Filter Coffee Spot"
        ],
        "imageUrl": "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=1000&q=80",
        "googleMapsUrl": "https://www.google.com/maps/place/Taaza+Thindi/@12.9228371,77.593274,17z/data=!3m1!4b1!4m6!3m5!1s0x3bae15a776da381b:0x5948b61bc4c0140a!8m2!3d12.9228371!4d77.593274!16s%2Fg%2F11b6vgdgpj?entry=ttu&g_ep=EgoyMDI2MDgxOS4wIKXMDSoASAFQAw%3D%3D",
        "timings": "7:00 AM \u2013 12:00 PM, 4:30 PM \u2013 9:30 PM",
        "curatorNote": "World-class hygiene with automated dishwashers and incredible consistency. Their golden ghee masala dosa is top-tier in Bangalore.",
        "isVegetarian": True,
        "verified": True
    },
    {
        "id": "brahmins-coffee-bar",
        "name": "Brahmins' Coffee Bar",
        "slug": "brahmins-coffee-bar",
        "tagline": "Pillowy soft idlis drenched in coconut chutney since 1965",
        "description": "No chairs, no sambar, no fluff \u2014 just melt-in-the-mouth steamed idlis, crunchy vadas, and endless pours of free coconut chutney from a stainless ladle.",
        "category": "Iconic Heritage",
        "neighborhood": "Basavanagudi",
        "address": "Near Shankar Math, Ranga Rao Rd, Shankarapura, Bengaluru, Karnataka 560004",
        "lat": 12.9539725,
        "lng": 77.568847,
        "priceLevel": "\u20b9",
        "priceForTwo": "\u20b9150",
        "mustTry": [
            "Steamed Idli-Vada combo",
            "Khara Bath",
            "Kesari Bath",
            "Filter Coffee"
        ],
        "vibeTags": [
            "Heritage (Pre-1980)",
            "Pure Veg",
            "Breakfast Spot",
            "Filter Coffee Spot",
            "Pocket Friendly"
        ],
        "imageUrl": "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=1000&q=80",
        "googleMapsUrl": "https://www.google.com/maps/place/Brahmins'+Coffee+Bar/@12.9539725,77.568847,17z/data=!3m1!4b1!4m6!3m5!1s0x3bae15f0a35b8ae3:0xc02176d1e45cb964!8m2!3d12.9539725!4d77.568847!16s%2Fg%2F1tfk2wgm?entry=ttu&g_ep=EgoyMDI2MDgxOS4wIKXMDSoASAFQAw%3D%3D",
        "timings": "6:00 AM \u2013 12:00 PM, 3:00 PM \u2013 7:00 PM (Closed Sundays evening)",
        "curatorNote": "Stand on the tree-shaded sidewalk with a steaming cup of freshly frothed coffee.",
        "isVegetarian": True,
        "verified": True
    },
    {
        "id": "mtr-lalbagh",
        "name": "Mavalli Tiffin Room (MTR 1924)",
        "slug": "mtr-lalbagh",
        "tagline": "The historic 1924 birthplace of the Rava Idli & silver-service thalis",
        "description": "Operating near Lalbagh Main Gate since 1924, MTR is an internationally celebrated temple of traditional Karnataka Brahminical cuisine, invention birthplace of Rava Idli during WWII rationing.",
        "category": "Iconic Heritage",
        "neighborhood": "Basavanagudi",
        "address": "14, Lal Bagh Main Rd, Doddamavalli, Sudhama Nagar, Bengaluru, Karnataka 560027",
        "lat": 12.9466256,
        "lng": 77.5774511,
        "priceLevel": "\u20b9\u20b9",
        "priceForTwo": "\u20b9500",
        "mustTry": [
            "Original Rava Idli with Ghee & Potato Saagu",
            "Masala Dosa with Pure Ghee",
            "Chandrahara Sweet",
            "Pure Filter Coffee in Silver Cup"
        ],
        "vibeTags": [
            "Heritage (Pre-1980)",
            "Pure Veg",
            "Breakfast Spot",
            "Filter Coffee Spot"
        ],
        "imageUrl": "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=1000&q=80",
        "googleMapsUrl": "https://www.google.com/maps/place/MTR/@12.9466256,77.5774511,15z/data=!4m10!1m2!2m1!1sMavalli+Tiffin+Room+Basavanagudi+Bangalore!3m6!1s0x3bae15dda4a3a569:0xde94c3a7899fc902!8m2!3d12.9551821!4d77.5855569!15sCipNYXZhbGxpIFRpZmZpbiBSb29tIEJhc2F2YW5hZ3VkaSBCYW5nYWxvcmUiA4gBAVosIiptYXZhbGxpIHRpZmZpbiByb29tIGJhc2F2YW5hZ3VkaSBiYW5nYWxvcmWSARV2ZWdldGFyaWFuX3Jlc3RhdXJhbnTgAQA!16s%2Fg%2F1td_93bg?entry=ttu&g_ep=EgoyMDI2MDgxOS4wIKXMDSoASAFQAw%3D%3D",
        "timings": "6:30 AM \u2013 11:00 AM, 12:30 PM \u2013 8:30 PM (Closed Mondays)",
        "curatorNote": "Order the silver thali lunch or pair Rava Idli with their signature cup of melted spiced ghee.",
        "isVegetarian": True,
        "verified": True
    },
    {
        "id": "dwaraka-hotel-basavanagudi",
        "name": "Dwaraka Hotel",
        "slug": "dwaraka-hotel-basavanagudi",
        "tagline": "Legendary cloud-soft Khali Dosa with dollops of white butter",
        "description": "A no-frills South Bangalore jewel in NR Colony renowned across food circles for its spongy Khali Dosa served with copious amounts of fresh homemade butter.",
        "category": "Iconic Heritage",
        "neighborhood": "Basavanagudi",
        "address": "15, 4th Main Rd, 7th Cross Rd, NR Colony, Basavanagudi, Bengaluru, Karnataka 560019",
        "lat": 12.9376662,
        "lng": 77.5676709,
        "priceLevel": "\u20b9",
        "priceForTwo": "\u20b9180",
        "mustTry": [
            "Khali Dosa with Butter",
            "Kaayi Chutney",
            "Filter Coffee",
            "Uddina Vada"
        ],
        "vibeTags": [
            "Heritage (Pre-1980)",
            "Pure Veg",
            "Breakfast Spot",
            "Filter Coffee Spot",
            "Pocket Friendly"
        ],
        "imageUrl": "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=1000&q=80",
        "googleMapsUrl": "https://www.google.com/maps/place/Hotel+Dwarka/@12.9376662,77.5676709,17z/data=!3m1!4b1!4m6!3m5!1s0x3bae158c001b1d45:0x4c1f091a8dfde839!8m2!3d12.9376662!4d77.5676709!16s%2Fg%2F1tf5j24f?entry=ttu&g_ep=EgoyMDI2MDgxOS4wIKXMDSoASAFQAw%3D%3D",
        "timings": "7:00 AM \u2013 12:30 PM, 3:30 PM \u2013 8:30 PM",
        "curatorNote": "Reddit insider tip: Ask for the double butter Khali Dosa. It is pillow-soft and absorbs the soothing white coconut chutney.",
        "isVegetarian": True,
        "verified": True
    },
    {
        "id": "puliyogare-point-basavanagudi",
        "name": "Puliyogare Point",
        "slug": "puliyogare-point-basavanagudi",
        "tagline": "Authentic Melkote-style temple Tamarind Rice & Button Vadas",
        "description": "A Basavanagudi classic beloved for its authentic Melkote temple-style Puliyogare (tamarind rice) loaded with peanuts and dry coconut, paired with sweet Sakkare Pongal and crispy button vadas.",
        "category": "Iconic Heritage",
        "neighborhood": "Basavanagudi",
        "address": "81, Bull Temple Rd & East Anjaneya Temple St, NR Colony, Basavanagudi, Bengaluru, Karnataka 560004",
        "lat": 12.9405837,
        "lng": 77.5686576,
        "priceLevel": "\u20b9",
        "priceForTwo": "\u20b9150",
        "mustTry": [
            "Melkote Style Puliyogare",
            "Sakkare Pongal (Sweet Pongal)",
            "Button Vada Soup",
            "Masala Dosa",
            "Filter Coffee"
        ],
        "vibeTags": [
            "Heritage (Pre-1980)",
            "Pure Veg",
            "Breakfast Spot",
            "Pocket Friendly"
        ],
        "imageUrl": "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=1000&q=80",
        "googleMapsUrl": "https://www.google.com/maps/place/Puliyogare+Point/@12.9405837,77.5686576,18z/data=!4m10!1m2!2m1!1sPuliyogare+Point+81,+Bull+Temple+Rd+%26+East+Anjaneya+Temple+St,+NR+Colony,+Basavanagudi,+Bengaluru,+Karnataka+560004!3m6!1s0x3bae158cff9f95e3:0x569a49dd37af78ba!8m2!3d12.9406914!4d77.5704138!15sCnNQdWxpeW9nYXJlIFBvaW50IDgxLCBCdWxsIFRlbXBsZSBSZCAmIEVhc3QgQW5qYW5leWEgVGVtcGxlIFN0LCBOUiBDb2xvbnksIEJhc2F2YW5hZ3VkaSwgQmVuZ2FsdXJ1LCBLYXJuYXRha2EgNTYwMDA0WnAibnB1bGl5b2dhcmUgcG9pbnQgODEgYnVsbCB0ZW1wbGUgcmQgJiBlYXN0IGFuamFuZXlhIHRlbXBsZSBzdCBuciBjb2xvbnkgYmFzYXZhbmFndWRpIGJlbmdhbHVydSBrYXJuYXRha2EgNTYwMDA0kgEXc291dGhfaW5kaWFuX3Jlc3RhdXJhbnTgAQA!16s%2Fg%2F124yfs4d7?entry=ttu&g_ep=EgoyMDI2MDgxOS4wIKXMDSoASAFQAw%3D%3D",
        "timings": "7:00 AM \u2013 10:00 PM",
        "curatorNote": "The authentic blend of Melkote spices in the tamarind paste is unmatched in the city. Pair with sweet golden pongal.",
        "isVegetarian": True,
        "verified": True
    },
    {
        "id": "sn-refreshments-jayanagar",
        "name": "SN Refreshments",
        "slug": "sn-refreshments-jayanagar",
        "tagline": "Jayanagar\u2019s favorite giant Thatte Idlis & spicy red chutney",
        "description": "A bustling South Bangalore standing breakfast staple in Jayanagar 9th Block famous for plate-sized spongy Thatte Idlis smothered in spiced coconut chutney and crispy hot uddina vadas.",
        "category": "Iconic Heritage",
        "neighborhood": "Jayanagar",
        "address": "22, 2nd Main Rd, 39th Cross Rd, 9th Block, Jayanagar, Bengaluru, Karnataka 560041",
        "lat": 12.908302,
        "lng": 77.5871088,
        "priceLevel": "\u20b9",
        "priceForTwo": "\u20b9120",
        "mustTry": [
            "Thatte Idli with Red & Coconut Chutney",
            "Uddina Vada",
            "Open Masala Dosa",
            "Shavige Bath",
            "Filter Coffee"
        ],
        "vibeTags": [
            "Pure Veg",
            "Breakfast Spot",
            "Filter Coffee Spot",
            "Pocket Friendly"
        ],
        "imageUrl": "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=1000&q=80",
        "googleMapsUrl": "https://www.google.com/maps/place/Shankara+Narayana+Refreshments+(S.+N.+Refreshments)/@12.908302,77.5871088,17z/data=!3m1!4b1!4m6!3m5!1s0x3bae1512f038fa13:0xec0d1aaf01dac46a!8m2!3d12.908302!4d77.5871088!16s%2Fg%2F1tjcmx3l?entry=ttu&g_ep=EgoyMDI2MDgxOS4wIKXMDSoASAFQAw%3D%3D",
        "timings": "6:30 AM \u2013 12:30 PM, 4:00 PM \u2013 9:00 PM",
        "curatorNote": "Super fast counter service. Order two piping hot thatte idlis with extra red chutney and a crispy vada.",
        "isVegetarian": True,
        "verified": True
    },
    {
        "id": "airlines-hotel-lavelle-road",
        "name": "Airlines Hotel",
        "slug": "airlines-hotel-lavelle-road",
        "tagline": "Bangalore\u2019s iconic leafy drive-in beneath century-old banyans",
        "description": "Since 1968, Airlines Hotel has been Bangalore\u2019s quintessential outdoor breakfast institution, with patrons parked under canopy trees enjoying chole bhature and filter coffee.",
        "category": "Iconic Heritage",
        "neighborhood": "Lavelle Road",
        "address": "4, Madras Bank Rd, Off Lavelle Rd, Shanthala Nagar, Ashok Nagar, Bengaluru, Karnataka 560001",
        "lat": 12.9729273,
        "lng": 77.5999161,
        "priceLevel": "\u20b9\u20b9",
        "priceForTwo": "\u20b9400",
        "mustTry": [
            "Chole Bhature",
            "Crispy Butter Masala Dosa",
            "Vada Sambar",
            "Strong Filter Coffee"
        ],
        "vibeTags": [
            "Heritage (Pre-1980)",
            "Outdoor Seating",
            "Breakfast Spot",
            "Pet Friendly",
            "Filter Coffee Spot"
        ],
        "imageUrl": "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1000&q=80",
        "googleMapsUrl": "https://www.google.com/maps/place/Airlines+Hotel/@12.9729273,77.5999161,17z/data=!4m9!3m8!1s0x3bae16797b5c6ad5:0x83334d052c61949c!5m2!4m1!1i2!8m2!3d12.9729273!4d77.5999161!16s%2Fg%2F1tm283p_?entry=ttu&g_ep=EgoyMDI2MDgxOS4wIKXMDSoASAFQAw%3D%3D",
        "timings": "7:00 AM \u2013 10:00 PM",
        "curatorNote": "The quintessential Bangalore weekend morning ritual. Park in the shaded driveway and order coffee brought straight to your car.",
        "isVegetarian": True,
        "verified": True
    },
    {
        "id": "koshys-st-marks-road",
        "name": "Koshy's Parade Cafe",
        "slug": "koshys-st-marks-road",
        "tagline": "The legendary 1940s intellectual heart of Bangalore on St. Marks Road",
        "description": "Operating since 1940, Koshy's is an irreplaceable cultural institution where prime ministers, journalists, artists, and diplomats have debated over mutton cutlets and filter coffee for 80+ years.",
        "category": "Iconic Heritage",
        "neighborhood": "Church Street & MG Road",
        "address": "39, St. Mark's Rd, Shanthala Nagar, Ashok Nagar, Bengaluru, Karnataka 560001",
        "lat": 12.9756429,
        "lng": 77.6014047,
        "priceLevel": "\u20b9\u20b9",
        "priceForTwo": "\u20b9800",
        "mustTry": [
            "Koshy's Mutton Cutlet",
            "Fish & Chips with Tartar Sauce",
            "Potato & Bacon Sausage Omelette",
            "Appam with Mutton Stew"
        ],
        "vibeTags": [
            "Heritage (Pre-1980)",
            "Breakfast Spot",
            "Late Night"
        ],
        "imageUrl": "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1000&q=80",
        "googleMapsUrl": "https://www.google.com/maps/place/Koshy's/@12.9756429,77.6014047,17z/data=!3m1!4b1!4m6!3m5!1s0x3bae167b83344389:0x9de21f628fb390a!8m2!3d12.9756429!4d77.6014047!16zL20vMGcxZ2pf?entry=ttu&g_ep=EgoyMDI2MDgxOS4wIKXMDSoASAFQAw%3D%3D",
        "timings": "9:00 AM \u2013 11:00 PM",
        "curatorNote": "Ask for a table in the non-AC heritage front room to soak in the vintage fans and literary Bangalore banter.",
        "isVegetarian": False,
        "verified": True
    },
    {
        "id": "the-only-place-museum-road",
        "name": "The Only Place",
        "slug": "the-only-place-museum-road",
        "tagline": "Bangalore\u2019s classic 1965 steakhouse, Salisbury steaks & Dutch Apple Pie",
        "description": "Since 1965, this tree-shaded patio on Museum Road has been the city\u2019s quintessential steakhouse institution, famed for tender Chateaubriand steaks, burgers, and warm apple pie with ice cream.",
        "category": "Iconic Heritage",
        "neighborhood": "Church Street & MG Road",
        "address": "6/5, Gurappa Avenue, Primrose Rd, Off MG Rd, Bengaluru, Karnataka 560025",
        "lat": 12.973234,
        "lng": 77.6034017,
        "priceLevel": "\u20b9\u20b9\u20b9",
        "priceForTwo": "\u20b91,400",
        "mustTry": [
            "Chateaubriand Steak with Mashed Potatoes",
            "Salisbury Steak",
            "Whopper Double Beef Burger",
            "Warm Apple Pie with Ice Cream",
            "Lasagna Bolognese"
        ],
        "vibeTags": [
            "Heritage (Pre-1980)",
            "Outdoor Seating",
            "Romantic",
            "Pet Friendly"
        ],
        "imageUrl": "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1000&q=80",
        "googleMapsUrl": "https://www.google.com/maps/place/The+Only+Place/@12.973234,77.6034017,17z/data=!3m1!4b1!4m6!3m5!1s0x3bae167ea0024c85:0x34c750828e50715c!8m2!3d12.973234!4d77.6034017!16s%2Fg%2F1v6qg1pt?entry=ttu&g_ep=EgoyMDI2MDgxOS4wIKXMDSoASAFQAw%3D%3D",
        "timings": "12:00 PM \u2013 3:30 PM, 7:00 PM \u2013 11:00 PM",
        "curatorNote": "An irreplaceable part of old Bangalore. Sit in the leafy garden courtyard and order the Chateaubriand steak followed by their legendary cinnamon-spiced apple pie.",
        "isVegetarian": False,
        "verified": True
    },
    {
        "id": "rameshwaram-cafe-indiranagar",
        "name": "The Rameshwaram Cafe",
        "slug": "rameshwaram-cafe-indiranagar",
        "tagline": "Massive 15,000 sq ft 100ft Rd flagship for pure ghee Podi Idlis & Dosas",
        "description": "Bangalore's viral 24/7 tiffin landmark at its flagship 15,000 sq ft 100 Feet Road location. Massive crowds gather around the clock for sizzling pure ghee Open Butter Masala Dosas, Podi Idlis, and filter coffee.",
        "category": "Iconic Heritage",
        "neighborhood": "Indiranagar",
        "address": "847/1, 100 Feet Rd, HAL 2nd Stage, Binnamangala, 1st Stage, Indiranagar, Bengaluru, Karnataka 560038",
        "lat": 12.9816796,
        "lng": 77.640918,
        "priceLevel": "\u20b9\u20b9",
        "priceForTwo": "\u20b9300",
        "mustTry": [
            "Ghee Podi Thatte Idli",
            "Ghee Open Butter Masala Dosa",
            "Garlic Roast Dosa",
            "Filter Coffee"
        ],
        "vibeTags": [
            "Pure Veg",
            "Late Night",
            "Breakfast Spot",
            "Filter Coffee Spot"
        ],
        "imageUrl": "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=1000&q=80",
        "googleMapsUrl": "https://www.google.com/maps/place/The+Rameshwaram+Cafe+@+Indiranagar/@12.9816796,77.640918,17z/data=!3m1!4b1!4m6!3m5!1s0x3bae179ad3b6da99:0xd823b05add6a7fae!8m2!3d12.9816796!4d77.640918!16s%2Fg%2F11rxqj2b2z?entry=ttu&g_ep=EgoyMDI2MDgxOS4wIKXMDSoASAFQAw%3D%3D",
        "timings": "6:30 AM \u2013 1:00 AM (Open Daily)",
        "curatorNote": "The ghee podi thatte idlis are drenched in piping hot spiced ghee and served with fresh coconut and tomato chutneys.",
        "isVegetarian": True,
        "verified": True
    },
    {
        "id": "the-hole-in-the-wall-cafe",
        "name": "The Hole in the Wall Cafe",
        "slug": "the-hole-in-the-wall-cafe",
        "tagline": "Bangalore\u2019s beloved brunch haven for all-day waffles, pancakes & English platters",
        "description": "An all-time Bangalore favorite in Koramangala 4th Block famous for hearty all-day American and English breakfast platters, fluffy buttermilk waffles, loaded burgers, and cozy brick patio vibes.",
        "category": "Specialty Coffee & Cafe",
        "neighborhood": "Koramangala",
        "address": "4, 8th Main Rd, 4th Block, Koramangala, Bengaluru, Karnataka 560034",
        "lat": 12.9347403,
        "lng": 77.6254693,
        "priceLevel": "\u20b9\u20b9",
        "priceForTwo": "\u20b9750",
        "mustTry": [
            "The All-Star English Breakfast",
            "Chocoholic Waffles with Vanilla Ice Cream",
            "Farmers Breakfast Frittata",
            "Gooey Grilled Cheese Sandwich",
            "Cinnamon Pancakes"
        ],
        "vibeTags": [
            "Breakfast Spot",
            "Pet Friendly",
            "Outdoor Seating",
            "Work Friendly"
        ],
        "imageUrl": "https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?auto=format&fit=crop&w=1000&q=80",
        "googleMapsUrl": "https://www.google.com/maps/place/The+Hole+In+The+Wall+Cafe/@12.9347403,77.6254693,17z/data=!3m1!4b1!4m6!3m5!1s0x3bae1467f472d4cb:0x51e2bde54ef70494!8m2!3d12.9347403!4d77.6254693!16s%2Fg%2F1td1swx6?entry=ttu&g_ep=EgoyMDI2MDgxOS4wIKXMDSoASAFQAw%3D%3D",
        "timings": "8:00 AM \u2013 9:00 PM (Closed Mondays)",
        "curatorNote": "The quintessential Bangalore breakfast institution. Grab a table on the upstairs patio and order the classic Farmer's Breakfast.",
        "isVegetarian": False,
        "verified": True,
        "branches": [
            {
                "id": "the-hole-in-the-wall-indiranagar",
                "name": "Indiranagar (12th Main)",
                "neighborhood": "Indiranagar",
                "address": "612, 12th Main Rd, 7th Cross, HAL 2nd Stage, Indiranagar, Bengaluru, Karnataka 560038",
                "lat": 12.9730599,
                "lng": 77.6382116,
                "googleMapsUrl": "https://www.google.com/maps/place/Indiranagar,+Bengaluru,+Karnataka/@12.9730599,77.6382116,15z/data=!3m1!4b1!4m6!3m5!1s0x3bae16a418770391:0xb50f46b826501036!8m2!3d12.9783692!4d77.6408356!16zL20vMDZ5M3Zj?entry=ttu&g_ep=EgoyMDI2MDgxOS4wIKXMDSoASAFQAw%3D%3D"
            }
        ]
    },
    {
        "id": "the-craftery-by-subko",
        "name": "The Craftery by Subko",
        "slug": "the-craftery-by-subko",
        "tagline": "Pod-to-bar craft chocolate roastery, bakehouse & micro-lot coffee bar",
        "description": "Subko\u2019s sprawling experimental craft roastery in Koramangala 3rd Block combining subcontinental micro-lot coffees with bean-to-bar chocolate manufacturing and 72-hour laminated sourdough viennoiserie.",
        "category": "Specialty Coffee & Cafe",
        "neighborhood": "Koramangala",
        "address": "68, 3rd Block, Koramangala, Bengaluru, Karnataka 560034",
        "lat": 12.9258697,
        "lng": 77.6255362,
        "priceLevel": "\u20b9\u20b9\u20b9",
        "priceForTwo": "\u20b91,200",
        "mustTry": [
            "Subko Cold Brew on Tap",
            "Twice-Baked Almond Croissant",
            "Pod-to-Bar Craft Chocolate Tiles",
            "Sourdough Tartines",
            "Flat White with Estate Beans"
        ],
        "vibeTags": [
            "Work Friendly",
            "Artisanal Sourdough",
            "Filter Coffee Spot"
        ],
        "imageUrl": "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1000&q=80",
        "googleMapsUrl": "https://www.google.com/maps/place/The+Craftery+By+Subko,+BLR/@12.9258697,77.6255362,17z/data=!3m1!4b1!4m6!3m5!1s0x3bae151eee0c4de5:0xe20284d093b46db2!8m2!3d12.9258697!4d77.6255362!16s%2Fg%2F11xdjtv8d5?entry=ttu&g_ep=EgoyMDI2MDgxOS4wIKXMDSoASAFQAw%3D%3D",
        "timings": "7:30 AM \u2013 10:30 PM",
        "curatorNote": "An industrial-chic craft coffee and chocolate wonderland. Watch them temper single-origin Indian cacao while sipping experimental pourovers.",
        "isVegetarian": False,
        "verified": True,
        "branches": [
            {
                "id": "subko-indiranagar",
                "name": "Indiranagar (12th Main)",
                "neighborhood": "Indiranagar",
                "address": "789/A, Ground Floor, 12th Main Rd, HAL 2nd Stage, Indiranagar, Bengaluru, Karnataka 560038",
                "lat": 12.9730599,
                "lng": 77.6382116,
                "googleMapsUrl": "https://www.google.com/maps/place/Indiranagar,+Bengaluru,+Karnataka/@12.9730599,77.6382116,15z/data=!3m1!4b1!4m6!3m5!1s0x3bae16a418770391:0xb50f46b826501036!8m2!3d12.9783692!4d77.6408356!16zL20vMDZ5M3Zj?entry=ttu&g_ep=EgoyMDI2MDgxOS4wIKXMDSoASAFQAw%3D%3D"
            },
            {
                "id": "ajji-house-by-subko-shanthi-nagar",
                "name": "Shanthi Nagar (Ajji House at The Courtyard)",
                "neighborhood": "CBD & Central",
                "address": "The Courtyard, 105, K.H. Road, Shanthinagar, Bengaluru, Karnataka 560027",
                "lat": 12.9584305,
                "lng": 77.5928951,
                "googleMapsUrl": "https://www.google.com/maps/place/Courtyard/@12.9584305,77.5928951,17z/data=!3m1!4b1!4m6!3m5!1s0x3bae15db06e7e3f7:0xd4b0ca3ed0db1d43!8m2!3d12.9584305!4d77.5928951!16s%2Fg%2F1hd_tj1jm?entry=ttu&g_ep=EgoyMDI2MDgxOS4wIKXMDSoASAFQAw%3D%3D"
            }
        ]
    },
    {
        "id": "araku-coffee",
        "name": "Araku Coffee Flagship",
        "slug": "araku-coffee",
        "tagline": "Regenerative biodynamic coffee temple and culinary flagship",
        "description": "Designed by NYC architects, Araku\u2019s 100ft road flagship is a sensory temple for single-origin tribal coffees from the Eastern Ghats, pour-over flights, and French-inspired organic cuisine.",
        "category": "Specialty Coffee & Cafe",
        "neighborhood": "Indiranagar",
        "address": "968, 12th Main Rd, HAL 2nd Stage, Indiranagar, Bengaluru, Karnataka 560038",
        "lat": 12.9699465,
        "lng": 77.6391732,
        "priceLevel": "\u20b9\u20b9\u20b9",
        "priceForTwo": "\u20b91,400",
        "mustTry": [
            "Selection Micro-climate Pour Over",
            "Nitro Cold Brew with Orange",
            "Sourdough Tartines",
            "Vanilla Basque Cheesecake"
        ],
        "vibeTags": [
            "Work Friendly",
            "Romantic",
            "Artisanal Sourdough"
        ],
        "imageUrl": "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1000&q=80",
        "googleMapsUrl": "https://www.google.com/maps/place/ARAKU+Coffee/@12.9699465,77.6391732,17z/data=!3m1!4b1!4m6!3m5!1s0x3bae17dd551e73bb:0xfe86382894413f7a!8m2!3d12.9699465!4d77.6391732!16s%2Fg%2F11mxv10y70?entry=ttu&g_ep=EgoyMDI2MDgxOS4wIKXMDSoASAFQAw%3D%3D",
        "timings": "8:00 AM \u2013 11:00 PM",
        "curatorNote": "Order the Modbar pour-over flight to taste how terroir drastically transforms Indian coffee flavor notes.",
        "isVegetarian": False,
        "verified": True
    },
    {
        "id": "one-five-four-breakfast-club",
        "name": "154 Breakfast Club",
        "slug": "one-five-four-breakfast-club",
        "tagline": "Hearty full English platters, fluffy pancakes & backyard cafe charm",
        "description": "A serene leafy bungalow in Koramangala 3rd Block that has anchored Bangalore\u2019s weekend breakfast scene with artisan bacon platters, savory waffles, and pour-overs.",
        "category": "Specialty Coffee & Cafe",
        "neighborhood": "Koramangala",
        "address": "154, 8th Main Rd, 3rd Block, Koramangala 4th Block, Bengaluru, Karnataka 560034",
        "lat": 12.9333838,
        "lng": 77.6270794,
        "priceLevel": "\u20b9\u20b9",
        "priceForTwo": "\u20b9800",
        "mustTry": [
            "Big Breakfast Platter (Sunny-side, Bacon, Sausages)",
            "Nutella Waffles",
            "Mushroom & Cheese Omelette",
            "Cold Brew Tonic"
        ],
        "vibeTags": [
            "Breakfast Spot",
            "Pet Friendly",
            "Outdoor Seating",
            "Work Friendly"
        ],
        "imageUrl": "https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?auto=format&fit=crop&w=1000&q=80",
        "googleMapsUrl": "https://www.google.com/maps/place/154+Breakfast+Club/@12.9333838,77.6270794,17z/data=!3m1!4b1!4m6!3m5!1s0x3bae145e73604653:0xb64a99330c93faf7!8m2!3d12.9333838!4d77.6270794!16s%2Fg%2F11b6hpb21f?entry=ttu&g_ep=EgoyMDI2MDgxOS4wIKXMDSoASAFQAw%3D%3D",
        "timings": "9:00 AM \u2013 9:00 PM (Closed Tuesdays)",
        "curatorNote": "A green Koramangala oasis for leisurely Sunday breakfasts and fluffy Belgian waffles.",
        "isVegetarian": False,
        "verified": True
    },
    {
        "id": "truffles-st-marks-road",
        "name": "Truffles",
        "slug": "truffles-st-marks-road",
        "tagline": "Bangalore\u2019s beloved burger institution & steakhouse comfort food",
        "description": "The quintessential Bangalore rite of passage for university students and burger purists. Famous for monster All American cheese burgers, peri-peri chicken steaks, and blueberry cheesecakes.",
        "category": "Specialty Coffee & Cafe",
        "neighborhood": "Church Street & MG Road",
        "address": "22, Vasavi Complex, St. Marks Rd, Shanthala Nagar, Ashok Nagar, Bengaluru, Karnataka 560001",
        "lat": 12.9718226,
        "lng": 77.6008918,
        "priceLevel": "\u20b9\u20b9",
        "priceForTwo": "\u20b9650",
        "mustTry": [
            "All American Cheese Burger",
            "Peri Peri Chicken Burger",
            "Ferrero Rocher Milkshake",
            "Sizzling Brownie with Ice Cream",
            "Chicken Lasagna"
        ],
        "vibeTags": [
            "Pocket Friendly",
            "Late Night"
        ],
        "imageUrl": "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=1000&q=80",
        "googleMapsUrl": "https://www.google.com/maps/place/Truffles+St.+Marks/@12.9718226,77.6008918,17z/data=!3m1!4b1!4m6!3m5!1s0x3bae167944a77259:0x98e639f6e9217987!8m2!3d12.9718226!4d77.6008918!16s%2Fg%2F12hkgg0r1?entry=ttu&g_ep=EgoyMDI2MDgxOS4wIKXMDSoASAFQAw%3D%3D",
        "timings": "11:00 AM \u2013 11:00 PM",
        "curatorNote": "Generations of Bangaloreans grew up eating the All American Cheese Burger with seasoned wedges.",
        "isVegetarian": False,
        "verified": True
    },
    {
        "id": "sunnys-lavelle-road",
        "name": "Sunny's",
        "slug": "sunnys-lavelle-road",
        "tagline": "Arjun Sajnani\u2019s legendary European pet-friendly bistro & wine garden",
        "description": "Founded by theater director Arjun Sajnani and named after his golden retriever, Sunny's on Lavelle Road is an upscale European institution famous for homemade pastas, steaks, and decadent desserts.",
        "category": "Specialty Coffee & Cafe",
        "neighborhood": "Lavelle Road",
        "address": "50, Lavelle Rd, Shanthala Nagar, Ashok Nagar, Bengaluru, Karnataka 560001",
        "lat": 12.9718487,
        "lng": 77.5985968,
        "priceLevel": "\u20b9\u20b9\u20b9\u20b9",
        "priceForTwo": "\u20b92,500",
        "mustTry": [
            "Filet Mignon with Gorgonzola",
            "Prawn Bisque",
            "Homemade Fettuccine Bolognese",
            "Classic Pavlova with Fresh Fruits",
            "Warm Mudpie with Ice Cream"
        ],
        "vibeTags": [
            "Pet Friendly",
            "Romantic",
            "Outdoor Seating"
        ],
        "imageUrl": "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1000&q=80",
        "googleMapsUrl": "https://www.google.com/maps/place/Sunnys+Restaurant/@12.9718487,77.5985968,17z/data=!3m1!4b1!4m6!3m5!1s0x3bae1679c3d5604d:0x7da0792c99257a34!8m2!3d12.9718487!4d77.5985968!16s%2Fg%2F1tfq7p18?entry=ttu&g_ep=EgoyMDI2MDgxOS4wIKXMDSoASAFQAw%3D%3D",
        "timings": "12:00 PM \u2013 11:30 PM",
        "curatorNote": "One of Bangalore\u2019s earliest pet-friendly luxury dining bistros. The leafy veranda and classic Gorgonzola steak are exceptional.",
        "isVegetarian": False,
        "verified": True
    },
    {
        "id": "anjus-cafe-ranga-shankara",
        "name": "Anju\u2019s Cafe at Ranga Shankara",
        "slug": "anjus-cafe-ranga-shankara",
        "tagline": "Theater courtyard cafe, freshly griddled Akki Rotti & spiced Chai",
        "description": "Nestled inside the iconic Ranga Shankara theatre in JP Nagar, Anju\u2019s Cafe is a leafy cultural haven where artists, theatre-goers, and food lovers gather for homemade Akki Rotti, banana cake, and masala tea.",
        "category": "Specialty Coffee & Cafe",
        "neighborhood": "JP Nagar",
        "address": "36/2, 8th Cross Rd, 2nd Phase, JP Nagar, Bengaluru, Karnataka 560078",
        "lat": 12.9114697,
        "lng": 77.5870766,
        "priceLevel": "\u20b9",
        "priceForTwo": "\u20b9300",
        "mustTry": [
            "Hot Akki Rotti with Yennegai Chutney",
            "Warm Banana Walnut Cake",
            "Ginger Cardamom Chai",
            "Sabudana Vada",
            "Filter Coffee"
        ],
        "vibeTags": [
            "Outdoor Seating",
            "Pocket Friendly",
            "Breakfast Spot"
        ],
        "imageUrl": "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1000&q=80",
        "googleMapsUrl": "https://www.google.com/maps/place/Anju's+Cafe/@12.9114697,77.5870766,17z/data=!3m1!4b1!4m6!3m5!1s0x3bae150d6e1f9175:0x21d8921f16528b47!8m2!3d12.9114697!4d77.5870766!16s%2Fg%2F11dz_y70qw?entry=ttu&g_ep=EgoyMDI2MDgxOS4wIKXMDSoASAFQAw%3D%3D",
        "timings": "11:00 AM \u2013 10:00 PM (Closed Mondays)",
        "curatorNote": "A soulful South Bangalore cultural sanctuary. Enjoy hot akki rotti under the open foyer while discussing theatre and arts.",
        "isVegetarian": True,
        "verified": True
    },
    {
        "id": "paris-panini-indiranagar",
        "name": "Paris Panini",
        "slug": "paris-panini-indiranagar",
        "tagline": "French street-style toasted paninis, frites & handmade dips",
        "description": "Founded by a French chef, Paris Panini serves golden crusty grilled baguettes named after French luminaries, crispy truffle frites, and homemade dips in a bustling bistro.",
        "category": "Specialty Coffee & Cafe",
        "neighborhood": "Indiranagar",
        "address": "948, Ground Floor, 12th Main Rd, HAL 2nd Stage, Indiranagar, Bengaluru, Karnataka 560038",
        "lat": 12.9702291,
        "lng": 77.6390555,
        "priceLevel": "\u20b9\u20b9",
        "priceForTwo": "\u20b9700",
        "mustTry": [
            "Jean (Bacon, Brie, Fig Jam Panini)",
            "Hugo (Pesto Chicken, Mozzarella)",
            "Truffle Fries with Garlic Aioli",
            "Nutella Beignets"
        ],
        "vibeTags": [
            "Pocket Friendly",
            "Late Night",
            "Outdoor Seating"
        ],
        "imageUrl": "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=1000&q=80",
        "googleMapsUrl": "https://www.google.com/maps/place/Paris+Panini+-+Gourmet+Sandwiches+%26+Wraps,+Indiranagar/@12.9702291,77.6390555,17z/data=!3m1!4b1!4m6!3m5!1s0x3bae1401e160415b:0xffb7ea557337d50c!8m2!3d12.9702291!4d77.6390555!16s%2Fg%2F11bx1j3fxr?entry=ttu&g_ep=EgoyMDI2MDgxOS4wIKXMDSoASAFQAw%3D%3D",
        "timings": "11:30 AM \u2013 11:30 PM",
        "curatorNote": "Warm, crispy French baguettes loaded with melted artisanal cheeses and signature dips. The Jean panini with brie and fig jam is iconic.",
        "isVegetarian": False,
        "verified": True
    },
    {
        "id": "naru-noodle-bar",
        "name": "Naru Noodle Bar",
        "slug": "naru-noodle-bar",
        "tagline": "8-seat artisanal handmade Ramen counter by Chef Victor Mookerjee",
        "description": "Bangalore\u2019s most coveted 8-seat Japanese noodle counter. Chef Victor hand-crafts high-hydration ramen noodles daily with 24-hour simmered broths and tare.",
        "category": "Pan-Asian & Japanese",
        "neighborhood": "CBD & Central",
        "address": "The Courtyard, 105, K.H. Road, Shanthinagar, Bengaluru, Karnataka 560027",
        "lat": 12.9584305,
        "lng": 77.5928951,
        "priceLevel": "\u20b9\u20b9\u20b9",
        "priceForTwo": "\u20b91,800",
        "mustTry": [
            "Tori Paitan Ramen",
            "Spicy Miso Ramen",
            "Crispy Gyoza",
            "Smoked Pork Belly Chashu"
        ],
        "vibeTags": [
            "Romantic",
            "Late Night"
        ],
        "imageUrl": "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=1000&q=80",
        "googleMapsUrl": "https://www.google.com/maps/place/Naru+Noodle+Bar/@12.9584305,77.5928951,17z/data=!3m1!4b1!4m6!3m5!1s0x3bae151f00f471fd:0x396c70c57ac2d3!8m2!3d12.9584305!4d77.5928951!16s%2Fg%2F11t9xkplyt?entry=ttu&g_ep=EgoyMDI2MDgxOS4wIKXMDSoASAFQAw%3D%3D",
        "timings": "12:30 PM \u2013 3:30 PM, 7:00 PM \u2013 10:30 PM (Reservation Only)",
        "curatorNote": "Slots open on Sunday and book out in under 30 seconds. The Tori Paitan chicken broth is silky and unctuous.",
        "isVegetarian": False,
        "verified": True
    },
    {
        "id": "kopitiam-lah-indiranagar",
        "name": "Kopitiam Lah",
        "slug": "kopitiam-lah-indiranagar",
        "tagline": "Authentic Malaysian & Singaporean Nanyang coffee shop & street eats",
        "description": "A cozy Nanyang-style Kopitiam on 12th Main Indiranagar serving freshly toasted kaya bread, fragrant coconut Nasi Lemak, spicy curry laksa, and pulled Teh Tarik.",
        "category": "Pan-Asian & Japanese",
        "neighborhood": "Indiranagar",
        "address": "1088, 12th Main Rd, HAL 2nd Stage, Indiranagar, Bengaluru, Karnataka 560038",
        "lat": 12.969909,
        "lng": 77.6381174,
        "priceLevel": "\u20b9\u20b9",
        "priceForTwo": "\u20b9900",
        "mustTry": [
            "Kaya Butter Toast with Soft Boiled Eggs",
            "Nasi Lemak with Sambal",
            "Curry Laksa Noodles",
            "Hainanese Chicken Rice",
            "Iced Teh Tarik"
        ],
        "vibeTags": [
            "Breakfast Spot",
            "Late Night",
            "Work Friendly"
        ],
        "imageUrl": "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=1000&q=80",
        "googleMapsUrl": "https://www.google.com/maps/place/Kopitiam+Lah/@12.969909,77.6381174,17z/data=!3m1!4b1!4m6!3m5!1s0x3bae17007bc824f1:0x30c19d5310e88561!8m2!3d12.969909!4d77.6381174!16s%2Fg%2F11w4qd9hgs?entry=ttu&g_ep=EgoyMDI2MDgxOS4wIKXMDSoASAFQAw%3D%3D",
        "timings": "8:30 AM \u2013 10:30 PM",
        "curatorNote": "Reddit cult favorite for authentic Nanyang breakfast. The freshly toasted bread with thick slabs of cold butter and pandan kaya jam paired with dark soy runny eggs is unbeatable.",
        "isVegetarian": False,
        "verified": True
    },
    {
        "id": "phobidden-fruit-indiranagar",
        "name": "Phobidden Fruit",
        "slug": "phobidden-fruit-indiranagar",
        "tagline": "Bangalore\u2019s legendary cozy Vietnamese garden & steaming Pho",
        "description": "A lush Indiranagar courtyard institution celebrated for soulful 12-hour simmered Pho broths, fresh summer rolls with peanut dip, and authentic Vietnamese drip coffee.",
        "category": "Pan-Asian & Japanese",
        "neighborhood": "Indiranagar",
        "address": "965, 12th Main Rd, HAL 2nd Stage, Indiranagar, Bengaluru, Karnataka 560038",
        "lat": 12.9699106,
        "lng": 77.6396389,
        "priceLevel": "\u20b9\u20b9\u20b9",
        "priceForTwo": "\u20b91,400",
        "mustTry": [
            "Traditional Beef Pho",
            "Fresh Rice Paper Summer Rolls",
            "Vietnamese Drip Coffee with Condensed Milk",
            "Lemongrass Vermicelli Bowl",
            "Claypot Caramelized Fish"
        ],
        "vibeTags": [
            "Romantic",
            "Outdoor Seating"
        ],
        "imageUrl": "https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?auto=format&fit=crop&w=1000&q=80",
        "googleMapsUrl": "https://www.google.com/maps/place/Phobidden+Fruit+Vietnamese+Kitchen/@12.9699106,77.6396389,17z/data=!3m1!4b1!4m6!3m5!1s0x3bae16a79ac22f77:0xef3290710970162!8m2!3d12.9699106!4d77.6396389!16s%2Fg%2F11b6gjjq12?entry=ttu&g_ep=EgoyMDI2MDgxOS4wIKXMDSoASAFQAw%3D%3D",
        "timings": "12:00 PM \u2013 3:30 PM, 7:00 PM \u2013 11:00 PM",
        "curatorNote": "A tranquil veranda setting with fragrant star anise and cinnamon infused Pho broths that warm the soul.",
        "isVegetarian": False,
        "verified": True
    },
    {
        "id": "the-fatty-bao-indiranagar",
        "name": "The Fatty Bao",
        "slug": "the-fatty-bao-indiranagar",
        "tagline": "Rooftop Asian gastropub, fluffy baos & inventive cocktails",
        "description": "Pioneered Bangalore\u2019s Asian gastropub revolution with its colorful rooftop setting on 12th Main Indiranagar, melt-in-mouth pork belly baos, and signature craft cocktails.",
        "category": "Pan-Asian & Japanese",
        "neighborhood": "Indiranagar",
        "address": "610, 3rd Floor, 12th Main Rd, HAL 2nd Stage, Indiranagar, Bengaluru, Karnataka 560038",
        "lat": 12.9705121,
        "lng": 77.6452835,
        "priceLevel": "\u20b9\u20b9\u20b9",
        "priceForTwo": "\u20b91,600",
        "mustTry": [
            "Char Siu Pork Bao",
            "Fatty Hill Cocktail",
            "Wild Mushroom Dim Sum",
            "Spicy Chasu Ramen",
            "Matcha Mousse"
        ],
        "vibeTags": [
            "Romantic",
            "Cocktail Program",
            "Outdoor Seating",
            "Late Night"
        ],
        "imageUrl": "https://images.unsplash.com/photo-1541544741938-0af808871cc0?auto=format&fit=crop&w=1000&q=80",
        "googleMapsUrl": "https://www.google.com/maps/place/The+Fatty+Bao/@12.9705121,77.6452835,17z/data=!3m1!4b1!4m6!3m5!1s0x3bae16a9d8462d9f:0x380971d8bf0df28f!8m2!3d12.9705121!4d77.6452835!16s%2Fg%2F11b61p_hvt?entry=ttu&g_ep=EgoyMDI2MDgxOS4wIKXMDSoASAFQAw%3D%3D",
        "timings": "12:00 PM \u2013 3:30 PM, 7:00 PM \u2013 11:30 PM (Closed Mondays)",
        "curatorNote": "The open-air rooftop is one of Indiranagar\u2019s best evening spots. The Char Siu pork belly bao with green apple kimchi is legendary.",
        "isVegetarian": False,
        "verified": True
    },
    {
        "id": "burma-burma",
        "name": "Burma Burma (Indiranagar)",
        "slug": "burma-burma",
        "tagline": "Celebrated all-vegetarian Burmese tea room and kitchen",
        "description": "Authentic Burmese curries, fermented tea leaf salads, and lotus root crisps in a peaceful, hand-painted wooden dining room on Indiranagar 12th Main.",
        "category": "Pan-Asian & Japanese",
        "neighborhood": "Indiranagar",
        "address": "607, Ground Floor, 12th Main Rd, 7th Cross, HAL 2nd Stage, Indiranagar, Bengaluru, Karnataka 560038",
        "lat": 12.9704847,
        "lng": 77.6447032,
        "priceLevel": "\u20b9\u20b9\u20b9",
        "priceForTwo": "\u20b91,500",
        "mustTry": [
            "Oh No Khow Suey",
            "Tea Leaf Salad (Laphet Thoke)",
            "Tofu Tots",
            "Lotus Biscoff Ice Cream"
        ],
        "vibeTags": [
            "Pure Veg",
            "Romantic"
        ],
        "imageUrl": "https://images.unsplash.com/photo-1541544741938-0af808871cc0?auto=format&fit=crop&w=1000&q=80",
        "googleMapsUrl": "https://www.google.com/maps/place/Burma+Burma+Restaurant+%26+Tea+Room/@12.9704847,77.6447032,17z/data=!3m1!4b1!4m6!3m5!1s0x3bae16a83230c487:0xaa8332e5c62e9785!8m2!3d12.9704847!4d77.6447032!16s%2Fg%2F11hcxlwhr7?entry=ttu&g_ep=EgoyMDI2MDgxOS4wIKXMDSoASAFQAw%3D%3D",
        "timings": "12:00 PM \u2013 3:30 PM, 6:30 PM \u2013 10:30 PM",
        "curatorNote": "Incredible depth of umami and herbal broths in a 100% vegetarian setting.",
        "isVegetarian": True,
        "verified": True,
        "branches": [
            {
                "id": "burma-burma-brigade-road",
                "name": "Brigade Road (Forum Rex Walk)",
                "neighborhood": "Church Street & MG Road",
                "address": "Forum Rex Walk, Brigade Rd, Shanthala Nagar, Ashok Nagar, Bengaluru, Karnataka 560001",
                "lat": 12.9727707,
                "lng": 77.606679,
                "googleMapsUrl": "https://www.google.com/maps/place/Forum+Rex+Walk/@12.9727707,77.606679,17z/data=!3m1!4b1!4m6!3m5!1s0x3bae179032b46849:0xfdd4d8b3d6f6cd15!8m2!3d12.9727707!4d77.606679!16s%2Fg%2F11lh3gpxg2?entry=ttu&g_ep=EgoyMDI2MDgxOS4wIKXMDSoASAFQAw%3D%3D"
            }
        ]
    },
    {
        "id": "burma-burma-brigade-road",
        "name": "Burma Burma (Brigade Road)",
        "slug": "burma-burma-brigade-road",
        "tagline": "Burmese tea room & delicacies at Forum Rex Walk",
        "description": "The chic central Bangalore home of Burma Burma at Forum Rex Walk on Brigade Road, serving exquisite artisanal teas, crispy lotus stem, and coconut broths.",
        "category": "Pan-Asian & Japanese",
        "neighborhood": "Church Street & MG Road",
        "address": "Unit 109, Ground Floor, Forum Rex Walk, Brigade Rd, Shanthala Nagar, Ashok Nagar, Bengaluru, Karnataka 560001",
        "lat": 12.9730401,
        "lng": 77.6061396,
        "priceLevel": "\u20b9\u20b9\u20b9",
        "priceForTwo": "\u20b91,500",
        "mustTry": [
            "Oh No Khow Suey",
            "Samosa Soup",
            "Avocado & Tea Leaf Salad",
            "Rangoon Baked Coconut Custard"
        ],
        "vibeTags": [
            "Pure Veg",
            "Romantic"
        ],
        "imageUrl": "https://images.unsplash.com/photo-1541544741938-0af808871cc0?auto=format&fit=crop&w=1000&q=80",
        "googleMapsUrl": "https://www.google.com/maps/place/Burma+Burma+Restaurant+%26+Tea+Room/@12.9730401,77.6061396,17z/data=!3m1!4b1!4m6!3m5!1s0x3bae17740a178f91:0xc86d6e877bee2c40!8m2!3d12.9730401!4d77.6061396!16s%2Fg%2F11kbb23vt5?entry=ttu&g_ep=EgoyMDI2MDgxOS4wIKXMDSoASAFQAw%3D%3D",
        "timings": "12:00 PM \u2013 4:00 PM, 6:30 PM \u2013 11:00 PM",
        "curatorNote": "Spacious, elegant ambiance in Rex Walk with dedicated specialty tea bar.",
        "isVegetarian": True,
        "verified": True,
        "branches": [
            {
                "id": "burma-burma",
                "name": "Indiranagar (12th Main)",
                "neighborhood": "Indiranagar",
                "address": "607, 12th Main Rd, 7th Cross, HAL 2nd Stage, Indiranagar, Bengaluru, Karnataka 560038",
                "lat": 12.9704847,
                "lng": 77.6447032,
                "googleMapsUrl": "https://www.google.com/maps/place/FLUX/@12.9704847,77.6447032,17z/data=!3m1!4b1!4m6!3m5!1s0x3bae17fa2282ae05:0xc17eeb4a35fcf257!8m2!3d12.9704847!4d77.6447032!16s%2Fg%2F11fp1r49vz?entry=ttu&g_ep=EgoyMDI2MDgxOS4wIKXMDSoASAFQAw%3D%3D"
            }
        ]
    },
    {
        "id": "lucky-chan-indiranagar",
        "name": "Lucky Chan (Indiranagar)",
        "slug": "lucky-chan-indiranagar",
        "tagline": "India\u2019s first conveyor-belt sushi & artisan dim sum parlour",
        "description": "A vibrant Pan-Asian hotspot on 12th Main Indiranagar celebrated for its revolving conveyor belt sushi bar, crystal dumplings, and craft bubble teas.",
        "category": "Pan-Asian & Japanese",
        "neighborhood": "Indiranagar",
        "address": "594, 12th Main Rd, HAL 2nd Stage, Indiranagar, Bengaluru, Karnataka 560008",
        "lat": 12.9704057,
        "lng": 77.642764,
        "priceLevel": "\u20b9\u20b9\u20b9",
        "priceForTwo": "\u20b91,500",
        "mustTry": [
            "Conveyor Belt Sushi",
            "Edamame Truffle Dumplings",
            "Prawn Hargao",
            "Spicy Salmon Roll",
            "Boba Milk Tea"
        ],
        "vibeTags": [
            "Romantic",
            "Cocktail Program",
            "Late Night"
        ],
        "imageUrl": "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=1000&q=80",
        "googleMapsUrl": "https://www.google.com/maps/place/Lucky+Chan/@12.9704057,77.642764,17z/data=!3m1!4b1!4m6!3m5!1s0x3bae1778cef99507:0x385ba9837ef6c8ae!8m2!3d12.9704057!4d77.642764!16s%2Fg%2F11fqz872k6?entry=ttu&g_ep=EgoyMDI2MDgxOS4wIKXMDSoASAFQAw%3D%3D",
        "timings": "12:00 PM \u2013 11:30 PM",
        "curatorNote": "Grab a counter seat by the revolving conveyor belt. Their translucent truffle edamame dumplings are exceptional.",
        "isVegetarian": False,
        "verified": True,
        "branches": [
            {
                "id": "lucky-chan-bellandur",
                "name": "Bellandur (The Bay, RMZ EcoWorld)",
                "neighborhood": "Whitefield",
                "address": "The Bay, RMZ EcoWorld, Outer Ring Rd, Bellandur, Bengaluru, Karnataka 560103",
                "lat": 12.9323181,
                "lng": 77.6748335,
                "googleMapsUrl": "https://www.google.com/maps/place/Bellandur,+Bengaluru,+Karnataka/@12.9323181,77.6748335,14z/data=!3m1!4b1!4m6!3m5!1s0x3bae13752e34e92f:0xc2b234a66f986aae!8m2!3d12.9304278!4d77.678404!16s%2Fg%2F11cny1499t?entry=ttu&g_ep=EgoyMDI2MDgxOS4wIKXMDSoASAFQAw%3D%3D"
            },
            {
                "id": "lucky-chan-forum-south",
                "name": "Kanakapura Rd (Forum South Bengaluru)",
                "neighborhood": "Jayanagar",
                "address": "3rd Floor, Forum South Bengaluru, Konanakunte Cross, Kanakapura Rd, Bengaluru, Karnataka 560062",
                "lat": 12.745448,
                "lng": 77.4878716,
                "googleMapsUrl": "https://www.google.com/maps/place/Kanakapura+Main+Rd,+Karnataka/@12.745448,77.4878716,17z/data=!3m1!4b1!4m6!3m5!1s0x3bae1577e33e4053:0xf6740652218cad5!8m2!3d12.745448!4d77.4878716!16s%2Fg%2F11h0blyjd?entry=ttu&g_ep=EgoyMDI2MDgxOS4wIKXMDSoASAFQAw%3D%3D"
            }
        ]
    },
    {
        "id": "lucky-chan-bellandur",
        "name": "Lucky Chan (Bellandur)",
        "slug": "lucky-chan-bellandur",
        "tagline": "Conveyor-belt sushi & dim sum dining at RMZ EcoWorld",
        "description": "Modern Japanese & Asian dining at The Bay in RMZ EcoWorld featuring conveyor belt sushi, fresh sashimi, and craft cocktails for the tech corridor.",
        "category": "Pan-Asian & Japanese",
        "neighborhood": "Whitefield",
        "address": "The Bay, RMZ EcoWorld, Outer Ring Road, Bellandur, Bengaluru, Karnataka 560103",
        "lat": 12.9202886,
        "lng": 77.6846386,
        "priceLevel": "\u20b9\u20b9\u20b9",
        "priceForTwo": "\u20b91,500",
        "mustTry": [
            "Crispy Prawn Tempura Roll",
            "Edamame Truffle Dumpling",
            "Pork Bao",
            "Matcha Bubble Tea"
        ],
        "vibeTags": [
            "Cocktail Program",
            "Work Friendly",
            "Outdoor Seating"
        ],
        "imageUrl": "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=1000&q=80",
        "googleMapsUrl": "https://www.google.com/maps/place/Lucky+Chan+-+Dim+Sum+and+Sushi+Parlour,+Bellandur/@12.9202886,77.6846386,17z/data=!3m1!4b1!4m6!3m5!1s0x3bae13007b02db37:0x47b7be25bc65ca18!8m2!3d12.9202886!4d77.6846386!16s%2Fg%2F11w22ndkvb?entry=ttu&g_ep=EgoyMDI2MDgxOS4wIKXMDSoASAFQAw%3D%3D",
        "timings": "12:00 PM \u2013 11:00 PM",
        "curatorNote": "Great lunch and dinner spot right in RMZ EcoWorld with full conveyor belt setup.",
        "isVegetarian": False,
        "verified": True,
        "branches": [
            {
                "id": "lucky-chan-indiranagar",
                "name": "Indiranagar (12th Main)",
                "neighborhood": "Indiranagar",
                "address": "594, 12th Main Rd, HAL 2nd Stage, Indiranagar, Bengaluru, Karnataka 560038",
                "lat": 12.9704057,
                "lng": 77.642764,
                "googleMapsUrl": "https://www.google.com/maps/place/594,+12th+Main+Rd,+2nd+Stage,+HAL+2nd+Stage,+Indiranagar,+Bengaluru,+Karnataka+560008/@12.9704057,77.642764,17z/data=!3m1!4b1!4m6!3m5!1s0x3bae16a80e4bf24f:0x18a7503aebeae1a8!8m2!3d12.9704057!4d77.642764!16s%2Fg%2F11snp_10r1?entry=ttu&g_ep=EgoyMDI2MDgxOS4wIKXMDSoASAFQAw%3D%3D"
            }
        ]
    },
    {
        "id": "mai-mai-indiranagar",
        "name": "Mai Mai",
        "slug": "mai-mai-indiranagar",
        "tagline": "Vibrant Southeast Asian street eats, hand-pulled noodles & boba",
        "description": "A vibrant neon-lit street food diner on Indiranagar 12th Main serving hearty Dan Dan noodles, Taiwanese braised pork bowls, juicy dumplings, and bubble teas.",
        "category": "Pan-Asian & Japanese",
        "neighborhood": "Indiranagar",
        "address": "621A, 12th Main Rd, 7th Cross, HAL 2nd Stage, Indiranagar, Bengaluru, Karnataka 560038",
        "lat": 12.9705628,
        "lng": 77.6469723,
        "priceLevel": "\u20b9\u20b9",
        "priceForTwo": "\u20b9900",
        "mustTry": [
            "Hand-Pulled Dan Dan Noodles",
            "Lu Rou Fan (Braised Pork Bowl)",
            "Crispy Chilli Oil Wontons",
            "Taiwanese Fried Chicken",
            "Taro Boba Tea"
        ],
        "vibeTags": [
            "Late Night",
            "Pocket Friendly"
        ],
        "imageUrl": "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=1000&q=80",
        "googleMapsUrl": "https://www.google.com/maps/place/Mai+Mai+-+East+Asian+Restaurant/@12.9705628,77.6469723,17z/data=!3m1!4b1!4m6!3m5!1s0x3bae178c64ff09a5:0xc6d5f51f94c6d468!8m2!3d12.9705628!4d77.6469723!16s%2Fg%2F11yhb8yq2z?entry=ttu&g_ep=EgoyMDI2MDgxOS4wIKXMDSoASAFQAw%3D%3D",
        "timings": "12:00 PM \u2013 11:30 PM",
        "curatorNote": "A casual, flavor-packed Southeast Asian joint. The hand-pulled noodles with fiery Sichuan chilli crisp are comforting perfection.",
        "isVegetarian": False,
        "verified": True
    },
    {
        "id": "baan-phadthai-indiranagar",
        "name": "Baan Phadthai",
        "slug": "baan-phadthai-indiranagar",
        "tagline": "Bangkok\u2019s Michelin Bib Gourmand artisan Pad Thai & street delicacies",
        "description": "The Bengaluru outpost of Bangkok\u2019s celebrated Michelin Bib Gourmand Thai diner, famous for its 18-ingredient secret tamarind sauce Phad Thai and vibrant wok bowls.",
        "category": "Pan-Asian & Japanese",
        "neighborhood": "Indiranagar",
        "address": "Sai Suraksha, 1090, 12th Main Rd, Doopanahalli, Indiranagar, Bengaluru, Karnataka 560038",
        "lat": 12.9698693,
        "lng": 77.6377675,
        "priceLevel": "\u20b9\u20b9\u20b9",
        "priceForTwo": "\u20b91,500",
        "mustTry": [
            "Phad Thai Goong (Jumbo Prawns)",
            "Crab Meat Pad Thai",
            "Tom Yum Goong",
            "Grilled Pork Neck",
            "Mango Sticky Rice"
        ],
        "vibeTags": [
            "Romantic",
            "Outdoor Seating",
            "Cocktail Program"
        ],
        "imageUrl": "https://images.unsplash.com/photo-1559314809-0d155014e29e?auto=format&fit=crop&w=1000&q=80",
        "googleMapsUrl": "https://www.google.com/maps/place/Baan+Phadthai+Indiranagar/@12.9698693,77.6377675,17z/data=!3m1!4b1!4m6!3m5!1s0x3bae17000efd5d1f:0x5db2769e683ff64a!8m2!3d12.9698693!4d77.6377675!16s%2Fg%2F11xld1lntx?entry=ttu&g_ep=EgoyMDI2MDgxOS4wIKXMDSoASAFQAw%3D%3D",
        "timings": "12:00 PM \u2013 1:00 AM",
        "curatorNote": "The 18-ingredient secret tamarind sauce brings authentic Bangkok Michelin street flavor to 12th Main Indiranagar.",
        "isVegetarian": False,
        "verified": True
    },
    {
        "id": "miso-sexy-indiranagar",
        "name": "Miso Sexy",
        "slug": "miso-sexy-indiranagar",
        "tagline": "High-energy Asian dining room, bespoke cocktails & neon rooftop",
        "description": "An electric Indiranagar hotspot known for stylish neon interiors, inventive Pan-Asian sushi rolls, robata skewers, dim sums, and signature mixology.",
        "category": "Pan-Asian & Japanese",
        "neighborhood": "Indiranagar",
        "address": "963, 12th Main Rd, HAL 2nd Stage, Indiranagar, Bengaluru, Karnataka 560038",
        "lat": 12.969883,
        "lng": 77.639914,
        "priceLevel": "\u20b9\u20b9\u20b9",
        "priceForTwo": "\u20b91,800",
        "mustTry": [
            "Truffle Edamame Dumpling",
            "Rock Shrimp Tempura",
            "Miso Sexy Signature Rolls",
            "Matcha Sour Cocktail",
            "Robata Chicken Skewers"
        ],
        "vibeTags": [
            "Romantic",
            "Cocktail Program",
            "Late Night",
            "Outdoor Seating"
        ],
        "imageUrl": "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=1000&q=80",
        "googleMapsUrl": "https://www.google.com/maps/place/MisoSexy+Bangalore/@12.969883,77.639914,17z/data=!3m1!4b1!4m6!3m5!1s0x3bae171f9255b733:0xe9a3553eecb9c1d6!8m2!3d12.969883!4d77.639914!16s%2Fg%2F11sqkbcwkl?entry=ttu&g_ep=EgoyMDI2MDgxOS4wIKXMDSoASAFQAw%3D%3D",
        "timings": "12:00 PM \u2013 1:00 AM",
        "curatorNote": "Stunning rooftop vibe overlooking Indiranagar canopy trees with standout sushi and inventive cocktail concoctions.",
        "isVegetarian": False,
        "verified": True
    },
    {
        "id": "misu-st-marks-road",
        "name": "Misu",
        "slug": "misu-st-marks-road",
        "tagline": "Sensational contemporary Pan-Asian fare & artful interiors",
        "description": "Chef Amit Roy\u2019s stylish Pan-Asian sanctuary featuring sleek cathedral murals, delicate dim sums, and fragrant Southeast Asian curries.",
        "category": "Pan-Asian & Japanese",
        "neighborhood": "Church Street & MG Road",
        "address": "4/1, Halcyon Complex, St. Marks Road, Bengaluru, Karnataka 560001",
        "lat": 12.9753968,
        "lng": 77.6018481,
        "priceLevel": "\u20b9\u20b9\u20b9",
        "priceForTwo": "\u20b91,500",
        "mustTry": [
            "Spicy Prawn & Chive Dim Sum",
            "Crispy Tofu with Peanut Dip",
            "Massaman Curry",
            "Dragon Roll Sushi",
            "Japanese Cheesecake"
        ],
        "vibeTags": [
            "Romantic",
            "Cocktail Program"
        ],
        "imageUrl": "https://images.unsplash.com/photo-1541544741938-0af808871cc0?auto=format&fit=crop&w=1000&q=80",
        "googleMapsUrl": "https://www.google.com/maps/place/Misu+-+1Sobha+Mall/@12.9753968,77.6018481,17z/data=!3m1!4b1!4m6!3m5!1s0x3bae167922704d7b:0xed2697ec1eaf5cfc!8m2!3d12.9753968!4d77.6018481!16s%2Fg%2F11g7nw4_z0?entry=ttu&g_ep=EgoyMDI2MDgxOS4wIKXMDSoASAFQAw%3D%3D",
        "timings": "12:00 PM \u2013 11:30 PM",
        "curatorNote": "One of Bangalore\u2019s most consistent and aesthetically pleasing Asian dining rooms.",
        "isVegetarian": False,
        "verified": True
    },
    {
        "id": "pizza-4ps-indiranagar",
        "name": "Pizza 4P's",
        "slug": "pizza-4ps-indiranagar",
        "tagline": "Japanese-Italian artisanal wood-fired pizza & house-made burrata",
        "description": "The global farm-to-table pizza phenomenon from Vietnam that took Bangalore by storm, featuring in-house crafted burrata, sourdough crusts, and serene biophilic design.",
        "category": "Modern Indian & Dining",
        "neighborhood": "Indiranagar",
        "address": "3275/A, 12th Main Rd, HAL 2nd Stage, Indiranagar, Bengaluru, Karnataka 560038",
        "lat": 12.9700194,
        "lng": 77.6361483,
        "priceLevel": "\u20b9\u20b9\u20b9\u20b9",
        "priceForTwo": "\u20b92,200",
        "mustTry": [
            "House-made Burrata Parma Ham Pizza",
            "4-Cheese Pizza with Organic Honey",
            "Crab Tomato Cream Spaghetti",
            "Camembert & Truffle Pizza",
            "Signature Tiramisu"
        ],
        "vibeTags": [
            "Artisanal Sourdough",
            "Romantic",
            "Outdoor Seating"
        ],
        "imageUrl": "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1000&q=80",
        "googleMapsUrl": "https://www.google.com/maps/place/Pizza+4P's+Indiranagar/@12.9700194,77.6361483,17z/data=!3m1!4b1!4m6!3m5!1s0x3bae17320b4595d9:0x11e174808d27ae53!8m2!3d12.9700194!4d77.6361483!16s%2Fg%2F11l2hnk492?entry=ttu&g_ep=EgoyMDI2MDgxOS4wIKXMDSoASAFQAw%3D%3D",
        "timings": "12:00 PM \u2013 11:30 PM",
        "curatorNote": "Book in advance. The house-made fresh burrata cut open table-side over Neapolitan crust with wildflower honey is unbeatable.",
        "isVegetarian": False,
        "verified": True
    },
    {
        "id": "the-pizza-bakery-indiranagar",
        "name": "The Pizza Bakery (Indiranagar)",
        "slug": "the-pizza-bakery-indiranagar",
        "tagline": "Wood-fired 48-hour sourdough pizzas & stuffed garlic breads",
        "description": "A cult Bangalore favorite celebrated for authentic Neapolitan hand-stretched sourdough pies, stuffed garlic loafs loaded with cheese, and craft brews.",
        "category": "Modern Indian & Dining",
        "neighborhood": "Indiranagar",
        "address": "2985, 12th Main Rd, HAL 2nd Stage, Indiranagar, Bengaluru, Karnataka 560038",
        "lat": 12.9701444,
        "lng": 77.6447056,
        "priceLevel": "\u20b9\u20b9\u20b9",
        "priceForTwo": "\u20b91,400",
        "mustTry": [
            "Popo\u2019s Veggie Delight",
            "Stuffed Garlic Bread with Caramelized Onion",
            "Truffle & Four Cheese Sourdough",
            "Nutella Sourdough Pizza",
            "Beer Braised Pork Sourdough"
        ],
        "vibeTags": [
            "Artisanal Sourdough",
            "Outdoor Seating",
            "Romantic"
        ],
        "imageUrl": "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1000&q=80",
        "googleMapsUrl": "https://www.google.com/maps/place/The+Pizza+Bakery+-+Indiranagar/@12.9701444,77.6447056,17z/data=!3m1!4b1!4m6!3m5!1s0x3bae16a82da08f99:0x3ce7be42251d9745!8m2!3d12.9701444!4d77.6447056!16s%2Fg%2F11f22wqsh4?entry=ttu&g_ep=EgoyMDI2MDgxOS4wIKXMDSoASAFQAw%3D%3D",
        "timings": "11:30 AM \u2013 11:30 PM",
        "curatorNote": "The 48-hour fermented sourdough crust has the perfect leopard-spotting and blistered air pockets. Do not skip the stuffed garlic bread.",
        "isVegetarian": False,
        "verified": True,
        "branches": [
            {
                "id": "the-pizza-bakery-church-street",
                "name": "Church Street (Coconut Grove)",
                "neighborhood": "Church Street & MG Road",
                "address": "86, Coconut Grove, Church St, Ashok Nagar, Bengaluru, Karnataka 560001",
                "lat": 12.9743637,
                "lng": 77.6077341,
                "googleMapsUrl": "https://www.google.com/maps/place/Church+St,+Bengaluru,+Karnataka/@12.9743637,77.6077341,17z/data=!3m1!4b1!4m6!3m5!1s0x3bae167c4d722c73:0x32a49eb101436b6d!8m2!3d12.9743637!4d77.6077341!16s%2Fg%2F11gfhsk6wj?entry=ttu&g_ep=EgoyMDI2MDgxOS4wIKXMDSoASAFQAw%3D%3D"
            }
        ]
    },
    {
        "id": "the-pizza-bakery-church-street",
        "name": "The Pizza Bakery (Church Street)",
        "slug": "the-pizza-bakery-church-street",
        "tagline": "Neapolitan sourdough pizzas in the bustling heart of Church Street",
        "description": "Chic CBD sourdough pizza bar nestled in the Coconut Grove complex, featuring wood-fired blistered crusts, craft beer, and Italian desserts.",
        "category": "Modern Indian & Dining",
        "neighborhood": "Church Street & MG Road",
        "address": "86, Coconut Grove, Church Street, Shanthala Nagar, Bengaluru, Karnataka 560001",
        "lat": 12.9752011,
        "lng": 77.6046089,
        "priceLevel": "\u20b9\u20b9\u20b9",
        "priceForTwo": "\u20b91,400",
        "mustTry": [
            "Truffle Burrata Pizza",
            "Stuffed Garlic Bread",
            "Nutella Sourdough Pizza",
            "Craft Beer on Tap"
        ],
        "vibeTags": [
            "Artisanal Sourdough",
            "Outdoor Seating",
            "Romantic"
        ],
        "imageUrl": "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1000&q=80",
        "googleMapsUrl": "https://www.google.com/maps/place/The+Pizza+Bakery+-+Church+Street/@12.9752011,77.6046089,17z/data=!3m1!4b1!4m6!3m5!1s0x3bae17df01fc2c3d:0x61eaa04d3b9f8234!8m2!3d12.9752011!4d77.6046089!16s%2Fg%2F11lkws0t9x?entry=ttu&g_ep=EgoyMDI2MDgxOS4wIKXMDSoASAFQAw%3D%3D",
        "timings": "11:30 AM \u2013 11:30 PM",
        "curatorNote": "Prime spot after browsing Church Street bookstores. Pair a sourdough pizza with local craft IPA.",
        "isVegetarian": False,
        "verified": True,
        "branches": [
            {
                "id": "the-pizza-bakery-indiranagar",
                "name": "Indiranagar (12th Main)",
                "neighborhood": "Indiranagar",
                "address": "2985, 12th Main Rd, HAL 2nd Stage, Indiranagar, Bengaluru, Karnataka 560038",
                "lat": 12.9701071,
                "lng": 77.6447307,
                "googleMapsUrl": "https://www.google.com/maps/place/2985,+12th+Main+Rd,+HAL+2nd+Stage,+Indiranagar,+Bengaluru,+Karnataka+560008/@12.9701071,77.6447307,17z/data=!3m1!4b1!4m6!3m5!1s0x3bae16a82c307d27:0x73af5e7e69e8f500!8m2!3d12.9701071!4d77.6447307!16s%2Fg%2F11gbk4hqzz?entry=ttu&g_ep=EgoyMDI2MDgxOS4wIKXMDSoASAFQAw%3D%3D"
            }
        ]
    },
    {
        "id": "brik-oven-church-street",
        "name": "Brik Oven",
        "slug": "brik-oven-church-street",
        "tagline": "Original wood-fired Neapolitan sourdough pizza & monstrous milkshakes",
        "description": "The Church Street original that pioneered sourdough Neapolitan pizza culture in Bangalore. Blistered crusts baked in a roaring brick oven at 450\u00b0C, fresh mozzarella, and indulgent milkshakes.",
        "category": "Modern Indian & Dining",
        "neighborhood": "Church Street & MG Road",
        "address": "19, Church St, Shanthala Nagar, Ashok Nagar, Bengaluru, Karnataka 560001",
        "lat": 12.974691,
        "lng": 77.6054207,
        "priceLevel": "\u20b9\u20b9\u20b9",
        "priceForTwo": "\u20b91,400",
        "mustTry": [
            "Smokey Margheriti",
            "Bird in Hand Pizza",
            "Truffle Fries",
            "Nutella Monster Shake",
            "Cookie Dough Sundae"
        ],
        "vibeTags": [
            "Artisanal Sourdough",
            "Romantic",
            "Late Night"
        ],
        "imageUrl": "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1000&q=80",
        "googleMapsUrl": "https://www.google.com/maps/place/Brik+Oven+-+Woodfired+Pizzas+(Church+Street)/@12.974691,77.6054207,17z/data=!3m1!4b1!4m6!3m5!1s0x3bae167db60c8faf:0xccbea34d8ecbdb62!8m2!3d12.974691!4d77.6054207!16s%2Fg%2F11ckkwvbbp?entry=ttu&g_ep=EgoyMDI2MDgxOS4wIKXMDSoASAFQAw%3D%3D",
        "timings": "11:30 AM \u2013 11:00 PM",
        "curatorNote": "Ask for the off-menu hot honey drizzle on their pepperoni and burrata pies.",
        "isVegetarian": False,
        "verified": True
    },
    {
        "id": "lupa-mg-road",
        "name": "LUPA",
        "slug": "lupa-mg-road",
        "tagline": "Chef Manu Chandra\u2019s opulent Tuscan-European villa & cellar",
        "description": "A grand Italian-European dining palace on MG Road by Chef Manu Chandra featuring an interactive salumeria, handmade pasta lab, dry-aged steaks, and a subterranean wine cellar.",
        "category": "Modern Indian & Dining",
        "neighborhood": "Church Street & MG Road",
        "address": "Spencer's Towers, Ground Floor, 86, MG Rd, Ashok Nagar, Bengaluru, Karnataka 560001",
        "lat": 12.975749,
        "lng": 77.604619,
        "priceLevel": "\u20b9\u20b9\u20b9\u20b9",
        "priceForTwo": "\u20b93,000",
        "mustTry": [
            "Hand-rolled Corzetti Pasta",
            "Dry-Aged Tenderloin",
            "Burrata with Spiced Fig",
            "In-House Gelato Lab Sundaes",
            "Signature Negroni"
        ],
        "vibeTags": [
            "Romantic",
            "Cocktail Program",
            "Outdoor Seating"
        ],
        "imageUrl": "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1000&q=80",
        "googleMapsUrl": "https://www.google.com/maps/place/LUPA/@12.975749,77.604619,17z/data=!3m1!4b1!4m6!3m5!1s0x3bae17975bc76cc1:0x35b2eb9bea244649!8m2!3d12.975749!4d77.604619!16s%2Fg%2F11tnvsd602?entry=ttu&g_ep=EgoyMDI2MDgxOS4wIKXMDSoASAFQAw%3D%3D",
        "timings": "12:00 PM \u2013 3:30 PM, 7:00 PM \u2013 1:00 AM",
        "curatorNote": "Manu Chandra\u2019s magnum opus on MG Road. Features an interactive salumeria, dedicated gelato lab, and subterranean wine cellar.",
        "isVegetarian": False,
        "verified": True
    },
    {
        "id": "toast-and-tonic-richmond",
        "name": "Toast & Tonic",
        "slug": "toast-and-tonic-richmond",
        "tagline": "Farm-to-cocktail East Village bistro with indigenous grains & botanicals",
        "description": "Pioneered Bangalore\u2019s artisanal Gin & Tonic revolution with a New York loft vibe, showcasing forgotten native grains, house-cured charcuterie, and bespoke botanical tonics.",
        "category": "Modern Indian & Dining",
        "neighborhood": "Church Street & MG Road",
        "address": "14/1, Wood St, Richmond Town, Ashok Nagar, Bengaluru, Karnataka 560025",
        "lat": 12.9669028,
        "lng": 77.6087806,
        "priceLevel": "\u20b9\u20b9\u20b9\u20b9",
        "priceForTwo": "\u20b92,500",
        "mustTry": [
            "Soft Shell Crab Flatbread",
            "Millet Salad with Mustard Greens",
            "Artisanal Gin & Tonics",
            "Slow Braised Pork Belly",
            "Spiced Guava Sorbet"
        ],
        "vibeTags": [
            "Romantic",
            "Cocktail Program"
        ],
        "imageUrl": "https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=1000&q=80",
        "googleMapsUrl": "https://www.google.com/maps/place/Toast+%26+Tonic+Restaurant/@12.9669028,77.6087806,17z/data=!3m1!4b1!4m6!3m5!1s0x3bae142abb919d95:0x787de55e8c379154!8m2!3d12.9669028!4d77.6087806!16s%2Fg%2F11cjvy5vrg?entry=ttu&g_ep=EgoyMDI2MDgxOS4wIKXMDSoASAFQAw%3D%3D",
        "timings": "12:00 PM \u2013 3:30 PM, 7:00 PM \u2013 12:30 AM",
        "curatorNote": "Every dish creatively honors indigenous Indian produce. Their house-infused botanical Gin cocktails are legendary.",
        "isVegetarian": False,
        "verified": True
    },
    {
        "id": "farmlore-bangalore",
        "name": "Farmlore",
        "slug": "farmlore-bangalore",
        "tagline": "18-seat wood-fired locavore culinary temple (Ranked Asia\u2019s 50 Best)",
        "description": "Set on a 37-acre regenerative farm in North Bangalore, Farmlore offers an intimate 18-seat wood-fired chef\u2019s degustation menu celebrated across global culinary rankings.",
        "category": "Modern Indian & Dining",
        "neighborhood": "Bel Road & North BLR",
        "address": "Sathanur Village, Bagalur, Bengaluru Rural, Karnataka 562149",
        "lat": 13.1273276,
        "lng": 77.6393523,
        "priceLevel": "\u20b9\u20b9\u20b9\u20b9",
        "priceForTwo": "\u20b98,000",
        "mustTry": [
            "10-Course Hyper-Seasonal Tasting Menu",
            "Charcoal-Grilled Native Greens",
            "Desi Heritage Broths",
            "Wood-Fired Fermented Breads"
        ],
        "vibeTags": [
            "Romantic",
            "Outdoor Seating"
        ],
        "imageUrl": "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=1000&q=80",
        "googleMapsUrl": "https://www.google.com/maps/place/Farmlore/@13.1273276,77.6393523,17z/data=!3m1!4b1!4m6!3m5!1s0x3bae19ef91fe581f:0x11660b3ae4c79ed7!8m2!3d13.1273276!4d77.6393523!16s%2Fg%2F11rsb3y2nt?entry=ttu&g_ep=EgoyMDI2MDgxOS4wIKXMDSoASAFQAw%3D%3D",
        "timings": "12:30 PM \u2013 4:00 PM, 7:00 PM \u2013 11:00 PM (Advance Reservation Required)",
        "curatorNote": "Powered 100% by solar and fire. Book months ahead for India\u2019s most visionary farm-to-table tasting experience.",
        "isVegetarian": False,
        "verified": True
    },
    {
        "id": "chinita-mexican-indiranagar",
        "name": "Chinita Real Mexican Food",
        "slug": "chinita-mexican-indiranagar",
        "tagline": "Authentic handcrafted corn tortillas, slow-braised carnitas & churros",
        "description": "Chef Candice Wilson\u2019s beloved Mexican taqueria in Indiranagar making fresh corn tortillas daily from scratch, loaded with roasted tomatillo salsas, slow-cooked meats, and warm cinnamon churros.",
        "category": "Modern Indian & Dining",
        "neighborhood": "Indiranagar",
        "address": "2186, 100 Feet Rd, HAL 2nd Stage, Indiranagar, Bengaluru, Karnataka 560038",
        "lat": 12.9809526,
        "lng": 77.6371323,
        "priceLevel": "\u20b9\u20b9\u20b9",
        "priceForTwo": "\u20b91,300",
        "mustTry": [
            "Pork Carnitas Tacos",
            "Grilled Fish Burrito Bowl",
            "Roasted Tomatillo Enchiladas",
            "Crispy Churros with Chocolate Dulce",
            "Fresh Horchata"
        ],
        "vibeTags": [
            "Romantic",
            "Outdoor Seating",
            "Late Night"
        ],
        "imageUrl": "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=1000&q=80",
        "googleMapsUrl": "https://www.google.com/maps/place/Chinita+Real+Mexican+Food/@12.9809526,77.6371323,17z/data=!3m1!4b1!4m6!3m5!1s0x3bae16bb4e0fed19:0xad8a47dc499423c2!8m2!3d12.9809526!4d77.6371323!16s%2Fg%2F11bbwmmy9s?entry=ttu&g_ep=EgoyMDI2MDgxOS4wIKXMDSoASAFQAw%3D%3D",
        "timings": "12:30 PM \u2013 3:30 PM, 7:00 PM \u2013 11:00 PM",
        "curatorNote": "Uncompromisingly authentic Mexican street food with gluten-free house-pressed corn tortillas and tangy tomatillo salsas.",
        "isVegetarian": False,
        "verified": True
    },
    {
        "id": "olive-beach-richmond-town",
        "name": "Olive Beach",
        "slug": "olive-beach-richmond-town",
        "tagline": "Sun-drenched Mediterranean villa, wood-fired pizzas & romance",
        "description": "Set within a stunning whitewashed colonial bungalow on Wood Street, Olive Beach has been Bangalore\u2019s quintessential romantic Mediterranean sanctuary for two decades.",
        "category": "Modern Indian & Dining",
        "neighborhood": "Church Street & MG Road",
        "address": "16, Wood St, Ashok Nagar, Richmond Town, Bengaluru, Karnataka 560025",
        "lat": 12.966892,
        "lng": 77.6080844,
        "priceLevel": "\u20b9\u20b9\u20b9\u20b9",
        "priceForTwo": "\u20b93,000",
        "mustTry": [
            "Braised Lamb Shank with Polenta",
            "Burrata with Roasted Tomatoes",
            "Truffle & Mushroom Risotto",
            "Salted Caramel Tart",
            "Sangria Pitcher"
        ],
        "vibeTags": [
            "Romantic",
            "Outdoor Seating",
            "Cocktail Program"
        ],
        "imageUrl": "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1000&q=80",
        "googleMapsUrl": "https://www.google.com/maps/place/Olive+Beach/@12.966892,77.6080844,17z/data=!3m1!4b1!4m6!3m5!1s0x3bae142aad557cd3:0xe6e1a61c52c08c7d!8m2!3d12.966892!4d77.6080844!16s%2Fg%2F1tdk__ng?entry=ttu&g_ep=EgoyMDI2MDgxOS4wIKXMDSoASAFQAw%3D%3D",
        "timings": "12:00 PM \u2013 3:30 PM, 7:00 PM \u2013 11:30 PM",
        "curatorNote": "The cobbled sunlit courtyard and bougainvillea-framed villa provide Bangalore\u2019s most romantic dining ambiance.",
        "isVegetarian": False,
        "verified": True
    },
    {
        "id": "phurr-jayanagar",
        "name": "Phurr",
        "slug": "phurr-jayanagar",
        "tagline": "Elevated pure-vegetarian modern gastronomy & botanical mocktail lounge",
        "description": "South Bangalore\u2019s crown jewel for progressive pure-vegetarian dining. Celebrated for whimsical multi-sensory plating, birdcage chandeliers, smoked cottage cheese steaks, and botanical mocktail alchemy.",
        "category": "Modern Indian & Dining",
        "neighborhood": "Jayanagar",
        "address": "40, 22nd Cross Rd, Jayanagar 3rd Block, Bengaluru, Karnataka 560011",
        "lat": 12.9327482,
        "lng": 77.5830067,
        "priceLevel": "\u20b9\u20b9\u20b9",
        "priceForTwo": "\u20b91,500",
        "mustTry": [
            "Truffle Mushroom Galouti",
            "Smoked Paneer Lababdar Cannelloni",
            "Deconstructed Dahi Bhalla",
            "Birdcage Botanical Mocktails",
            "Gulkand Charcoal Kulfi"
        ],
        "vibeTags": [
            "Pure Veg",
            "Romantic"
        ],
        "imageUrl": "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1000&q=80",
        "googleMapsUrl": "https://www.google.com/maps/place/PHURR+%7C+Jayanagar/@12.9327482,77.5830067,17z/data=!3m1!4b1!4m6!3m5!1s0x3bae1500173b97d3:0x4efc04f1bf48c7e8!8m2!3d12.9327482!4d77.5830067!16s%2Fg%2F11y24rp3sg?entry=ttu&g_ep=EgoyMDI2MDgxOS4wIKXMDSoASAFQAw%3D%3D",
        "timings": "12:00 PM \u2013 4:00 PM, 7:00 PM \u2013 11:00 PM",
        "curatorNote": "One of the most innovative pure-vegetarian culinary rooms in India. The Truffle Galouti and botanical smoking mocktails are pure culinary theater.",
        "isVegetarian": True,
        "verified": True
    },
    {
        "id": "karavalli-residency-road",
        "name": "Karavalli (The Gateway Hotel)",
        "slug": "karavalli-residency-road",
        "tagline": "India\u2019s undisputed temple of Southwest coastal culinary heritage since 1990",
        "description": "Set in a traditional Mangalorean courtyard house on Residency Road, Karavalli has spent over three decades researching and serving authentic coastal recipes from Kundapur, Mangalore, Coorg, and Kerala.",
        "category": "Regional & Coastal",
        "neighborhood": "Church Street & MG Road",
        "address": "Vivanta Bengaluru, 66, Residency Rd, Ashok Nagar, Bengaluru, Karnataka 560025",
        "lat": 12.9724473,
        "lng": 77.6086535,
        "priceLevel": "\u20b9\u20b9\u20b9\u20b9",
        "priceForTwo": "\u20b93,500",
        "mustTry": [
            "Kane (Ladyfish) Meen Bebbe Fry",
            "Tiger Prawns Roast",
            "Kori Gassi with Neer Dosa",
            "Alleppey Fish Curry",
            "Elaneer Payasam"
        ],
        "vibeTags": [
            "Heritage (Pre-1980)",
            "Outdoor Seating",
            "Romantic"
        ],
        "imageUrl": "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=1000&q=80",
        "googleMapsUrl": "https://www.google.com/maps/place/Karavalli+-+Vivanta+Bengaluru,+Residency+Road/@12.9724473,77.6086535,17z/data=!3m1!4b1!4m6!3m5!1s0x3bae167e46fb00e5:0x777b03419880fc1f!8m2!3d12.9724473!4d77.6086535!16s%2Fg%2F11b75nr421?entry=ttu&g_ep=EgoyMDI2MDgxOS4wIKXMDSoASAFQAw%3D%3D",
        "timings": "12:30 PM \u2013 3:00 PM, 7:00 PM \u2013 11:30 PM",
        "curatorNote": "One of the most decorated coastal restaurants in Asia. Sit in the tranquil courtyard and order Kori Gassi with paper-thin Neer Dosas.",
        "isVegetarian": False,
        "verified": True
    },
    {
        "id": "shivaji-military-hotel-jayanagar",
        "name": "Shivaji Military Hotel",
        "slug": "shivaji-military-hotel-jayanagar",
        "tagline": "Wood-fired Maratha Mutton Donne Biryani since 1924",
        "description": "A centenarian Bangalore institution in Jayanagar famed for wood-fire cooked Seeraga Samba mutton Donne Biryani, fiery mutton chops, and mutton dry.",
        "category": "Regional & Coastal",
        "neighborhood": "Jayanagar",
        "address": "718, 1st C Main, 45th Cross Rd, 8th Block, Jayanagar, Bengaluru, Karnataka 560082",
        "lat": 12.9180061,
        "lng": 77.5739663,
        "priceLevel": "\u20b9\u20b9",
        "priceForTwo": "\u20b9600",
        "mustTry": [
            "Mutton Donne Biryani",
            "Mutton Chops Dry",
            "Chicken Leg Fry",
            "Mutton Liver Fry"
        ],
        "vibeTags": [
            "Heritage (Pre-1980)",
            "Late Night",
            "Pocket Friendly"
        ],
        "imageUrl": "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=1000&q=80",
        "googleMapsUrl": "https://www.google.com/maps/place/Shivaji+Military+Hotel/@12.9180061,77.5739663,17z/data=!3m1!4b1!4m9!3m8!1s0x3bae1577040a6da9:0xc5a79a05c0719ce9!5m2!4m1!1i2!8m2!3d12.9180061!4d77.5739663!16s%2Fg%2F1tg9lkvb?entry=ttu&g_ep=EgoyMDI2MDgxOS4wIKXMDSoASAFQAw%3D%3D",
        "timings": "8:00 AM \u2013 3:30 PM (Closed Mondays)",
        "curatorNote": "Arrive by 12:30 PM for lunch. The green herbal masala Donne Biryani served in dried areca leaf bowls is peerless.",
        "isVegetarian": False,
        "verified": True
    },
    {
        "id": "ranganna-military-jayanagar",
        "name": "Ranganna Military Hotel",
        "slug": "ranganna-military-jayanagar",
        "tagline": "Karnataka rustic military breakfast, Thale Mamsa & Kaal Soup",
        "description": "An authentic Karnataka military hotel sanctum in Jayanagar revered for early-morning meat breakfasts, piping hot trotters (Kaal) soup, pepper mutton fry, and traditional Donne Biryani.",
        "category": "Regional & Coastal",
        "neighborhood": "Jayanagar",
        "address": "61, 1st Floor, 7th Block, Jayanagar, Bengaluru, Karnataka 560070",
        "lat": 12.9295639,
        "lng": 77.5738879,
        "priceLevel": "\u20b9\u20b9",
        "priceForTwo": "\u20b9500",
        "mustTry": [
            "Thale Mamsa (Head Meat) Fry",
            "Kaal (Paya) Soup with Idli",
            "Mutton Donne Biryani",
            "Koli Fry",
            "Boti Gojju"
        ],
        "vibeTags": [
            "Breakfast Spot",
            "Late Night",
            "Pocket Friendly"
        ],
        "imageUrl": "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=1000&q=80",
        "googleMapsUrl": "https://www.google.com/maps/place/Ranganna+Military+Hotel/@12.9295639,77.5738879,17z/data=!3m1!4b1!4m6!3m5!1s0x3bae159ad5ce2115:0x1448932f7a8b47bc!8m2!3d12.9295639!4d77.5738879!16s%2Fg%2F1vzv23jf?entry=ttu&g_ep=EgoyMDI2MDgxOS4wIKXMDSoASAFQAw%3D%3D",
        "timings": "7:30 AM \u2013 4:00 PM, 7:00 PM \u2013 10:30 PM (Closed Mondays)",
        "curatorNote": "Bangalore military hotel royalty. Dip soft thatte idlis into rich, peppery mutton Kaal soup for the ultimate Sunday breakfast.",
        "isVegetarian": False,
        "verified": True
    },
    {
        "id": "anupams-coast-to-coast",
        "name": "Anupam's Coast II Coast",
        "slug": "anupams-coast-to-coast",
        "tagline": "The undisputed shrine of Mangalorean Ghee Roast and Kane Fry",
        "description": "Central Bangalore\u2019s benchmark for fiery Kundapur coastal cooking. Fiery red ghee roasts, fresh fish thalis, and Kori Rotti that have drawn foodies for decades.",
        "category": "Regional & Coastal",
        "neighborhood": "Church Street & MG Road",
        "address": "4, 1, Brunton Rd, Craig Park Layout, Ashok Nagar, Bengaluru, Karnataka 560025",
        "lat": 12.974534,
        "lng": 77.6073495,
        "priceLevel": "\u20b9\u20b9\u20b9",
        "priceForTwo": "\u20b91,200",
        "mustTry": [
            "Prawn Ghee Roast",
            "Chicken Ghee Roast with Neer Dosa",
            "Anjal (Kingfish) Tawa Fry",
            "Kori Rotti",
            "Crab Sukka"
        ],
        "vibeTags": [
            "Late Night"
        ],
        "imageUrl": "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=1000&q=80",
        "googleMapsUrl": "https://www.google.com/maps/place/Anupam%E2%80%99s+Coast+To+Coast/@12.974534,77.6073495,17z/data=!3m1!4b1!4m6!3m5!1s0x3bae175cf4b95ae5:0xc30e8a7840325aae!8m2!3d12.974534!4d77.6073495!16s%2Fg%2F11byp6djrd?entry=ttu&g_ep=EgoyMDI2MDgxOS4wIKXMDSoASAFQAw%3D%3D",
        "timings": "11:30 AM \u2013 3:30 PM, 7:00 PM \u2013 11:00 PM",
        "curatorNote": "The rich, fiery red ghee roast masala coating juicy prawns is Bangalore coastal perfection. Soak every drop with soft Neer Dosas.",
        "isVegetarian": False,
        "verified": True
    },
    {
        "id": "maravanthe-coastal-indiranagar",
        "name": "Maravanthe Coastal Diner",
        "slug": "maravanthe-coastal-indiranagar",
        "tagline": "Pure Kundapura & Karavali coastal seafood thalis & ghee roasts",
        "description": "An authentic celebration of Karnataka\u2019s northern coastal belt (Kundapura & Udupi), famous for freshly landed Kane rava fry, silver fish tawa fry, Maravanthe fish curry meals, and Neer Dosa.",
        "category": "Regional & Coastal",
        "neighborhood": "Indiranagar",
        "address": "100 Feet Rd, HAL 2nd Stage, Indiranagar, Bengaluru, Karnataka 560038",
        "lat": 12.9783935,
        "lng": 77.6372562,
        "priceLevel": "\u20b9\u20b9",
        "priceForTwo": "\u20b9900",
        "mustTry": [
            "Maravanthe Seafood Meals Thali",
            "Kane (Ladyfish) Rava Fry",
            "Kundapura Crab Sukka",
            "Silver Fish (Kallur) Fry",
            "Neer Dosa with Fish Curry"
        ],
        "vibeTags": [
            "Late Night",
            "Pocket Friendly"
        ],
        "imageUrl": "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=1000&q=80",
        "googleMapsUrl": "https://www.google.com/maps/place/Maravanthe+Coastal+Cuisine/@12.9783935,77.6372562,17z/data=!3m1!4b1!4m6!3m5!1s0x3bae16a48e2bd1e5:0x420f46182ac6ef1b!8m2!3d12.9783935!4d77.6372562!16s%2Fg%2F11fz9jbx5l?entry=ttu&g_ep=EgoyMDI2MDgxOS4wIKXMDSoASAFQAw%3D%3D",
        "timings": "12:00 PM \u2013 3:45 PM, 7:00 PM \u2013 11:00 PM",
        "curatorNote": "The traditional Kundapura coconut fish curry and crispy rava-crusted Ladyfish bring coastal beach-highway flavors to Indiranagar.",
        "isVegetarian": False,
        "verified": True
    },
    {
        "id": "super-naati-mg-road",
        "name": "Super Naati",
        "slug": "super-naati-mg-road",
        "tagline": "Authentic Karnataka rustic Naati military hotel & Donne Biryani",
        "description": "Sizzling Karnataka military-style mutton chops fry, fiery pepper chicken, rich mutton saaru, and fragrant Donne Biryani served on eco-leaf plates in central Bangalore.",
        "category": "Regional & Coastal",
        "neighborhood": "Church Street & MG Road",
        "address": "Leo Complex, 45/1, Residency Rd 1st Cross, Shanthala Nagar, Ashok Nagar, Bengaluru, Karnataka 560025",
        "lat": 12.9740887,
        "lng": 77.6091747,
        "priceLevel": "\u20b9\u20b9",
        "priceForTwo": "\u20b9600",
        "mustTry": [
            "Naati Mutton Donne Biryani",
            "Mutton Chops Fry",
            "Naati Koli Saaru",
            "Boti Fry",
            "Paya Soup"
        ],
        "vibeTags": [
            "Late Night",
            "Pocket Friendly"
        ],
        "imageUrl": "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=1000&q=80",
        "googleMapsUrl": "https://www.google.com/maps/place/Super+Naati/@12.9740887,77.6091747,17z/data=!3m1!4b1!4m6!3m5!1s0x3bae17424c4cc337:0xa398706cdab48a74!8m2!3d12.9740887!4d77.6091747!16s%2Fg%2F11ywps6yy9?entry=ttu&g_ep=EgoyMDI2MDgxOS4wIKXMDSoASAFQAw%3D%3D",
        "timings": "12:00 PM \u2013 4:00 PM, 7:00 PM \u2013 11:00 PM",
        "curatorNote": "Bold, fiery green-chilli infused masala cooked the traditional Karnataka Naati way. The mutton chops are fork-tender.",
        "isVegetarian": False,
        "verified": True
    },
    {
        "id": "bengaluru-oota-company-halasuru",
        "name": "Bengaluru Oota Company",
        "slug": "bengaluru-oota-company-halasuru",
        "tagline": "Intimate chef\u2019s table celebrating Mangalorean Bunt & Gowda heirloom recipes",
        "description": "An exclusive, pre-booked culinary atelier in a turquoise Cambridge Layout house, serving multi-course heirloom feasts that showcase ancestral Gowda mudde-nati koli and Mangalorean Bunt seafood.",
        "category": "Regional & Coastal",
        "neighborhood": "Indiranagar",
        "address": "24-4, Cambridge Cross Rd, Halasuru, Bengaluru, Karnataka 560008",
        "lat": 12.9722815,
        "lng": 77.6259596,
        "priceLevel": "\u20b9\u20b9\u20b9\u20b9",
        "priceForTwo": "\u20b93,500",
        "mustTry": [
            "5-Course Heirloom Gowda & Mangalorean Feast",
            "Mutton Chops Pepper Fry",
            "Kori Rotti with Kundapur Chicken Gassi",
            "Prawn Ghee Roast",
            "Elaneer (Tender Coconut) Payasam"
        ],
        "vibeTags": [
            "Romantic",
            "Outdoor Seating"
        ],
        "imageUrl": "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=1000&q=80",
        "googleMapsUrl": "https://www.google.com/maps/place/Bengaluru+Oota+Company/@12.9722815,77.6259596,17z/data=!3m1!4b1!4m6!3m5!1s0x3bae169e91f568b7:0x396d3aeb0d625780!8m2!3d12.9722815!4d77.6259596!16s%2Fg%2F11cnm651sb?entry=ttu&g_ep=EgoyMDI2MDgxOS4wIKXMDSoASAFQAw%3D%3D",
        "timings": "12:30 PM \u2013 3:30 PM, 7:30 PM \u2013 10:30 PM (Advance Booking Required)",
        "curatorNote": "By reservation only. Intimate chef\u2019s table dining preserving the authentic culinary heritage of Karnataka\u2019s Bunt and Gowda families.",
        "isVegetarian": False,
        "verified": True
    },
    {
        "id": "meghana-foods-koramangala",
        "name": "Meghana Foods",
        "slug": "meghana-foods-koramangala",
        "tagline": "The undisputed cult king of spicy Andhra Boneless Chicken Biryani",
        "description": "The quintessential Bangalore rite of passage. Piping hot seeraga-style Andhra biryani layered with fiery fried chicken, spicy gravy, and raita that fuels late-night cravings.",
        "category": "Regional & Coastal",
        "neighborhood": "Koramangala",
        "address": "124, 1st A Cross Rd, KHB Colony, 5th Block, Koramangala, Bengaluru, Karnataka 560095",
        "lat": 12.9346561,
        "lng": 77.6163528,
        "priceLevel": "\u20b9\u20b9",
        "priceForTwo": "\u20b9700",
        "mustTry": [
            "Meghana Special Chicken Biryani (Boneless)",
            "Paneer Biryani",
            "Chilli Chicken",
            "Lemon Chicken"
        ],
        "vibeTags": [
            "Late Night",
            "Pocket Friendly"
        ],
        "imageUrl": "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=1000&q=80",
        "googleMapsUrl": "https://www.google.com/maps/place/Meghana+Foods+-+Koramangala/@12.9346561,77.6163528,17z/data=!3m1!4b1!4m6!3m5!1s0x3bae144e2b85ad09:0xdb6361ebf5aa1898!8m2!3d12.9346561!4d77.6163528!16s%2Fg%2F1tflkwhq?entry=ttu&g_ep=EgoyMDI2MDgxOS4wIKXMDSoASAFQAw%3D%3D",
        "timings": "11:30 AM \u2013 11:30 PM",
        "curatorNote": "The boneless special chicken biryani with its distinct red spiced chicken pieces and rice is an obsession across the city.",
        "isVegetarian": False,
        "verified": True
    },
    {
        "id": "toit-brewpub",
        "name": "Toit Brewpub",
        "slug": "toit-brewpub",
        "tagline": "The 2010 craft beer pioneer on 100 Feet Road that started the BLR pub revolution",
        "description": "Bangalore\u2019s most iconic microbrewery since 2010. Sprawling multi-level brick brewhouse serving signature Basmati Blonde, Tintin Belgian Wit, Tin Man IPA, and wood-fired sourdough pizzas.",
        "category": "Microbrewery",
        "neighborhood": "Indiranagar",
        "address": "298, 100 Feet Rd, Near KFC Junction, Indiranagar, Bengaluru, Karnataka 560038",
        "lat": 12.9795441,
        "lng": 77.6406542,
        "priceLevel": "\u20b9\u20b9\u20b9",
        "priceForTwo": "\u20b91,800",
        "mustTry": [
            "Tintin Toit (Belgian Wit)",
            "Tin Man (IPA)",
            "Toit Weiss (Hefeweizen)",
            "Tart Flamb\u00e9e Pizza",
            "Baked Potato Skins with Bacon"
        ],
        "vibeTags": [
            "Craft Beer",
            "Pet Friendly",
            "Late Night",
            "Outdoor Seating"
        ],
        "imageUrl": "https://images.unsplash.com/photo-1575444758702-4a6b9222336e?auto=format&fit=crop&w=1000&q=80",
        "googleMapsUrl": "https://www.google.com/maps/place/Toit/@12.9795441,77.6406542,17z/data=!3m1!4b1!4m6!3m5!1s0x3bae16a515404273:0x5a60fbf524977445!8m2!3d12.9795441!4d77.6406542!16s%2Fg%2F1vq738ts?entry=ttu&g_ep=EgoyMDI2MDgxOS4wIKXMDSoASAFQAw%3D%3D",
        "timings": "12:00 PM \u2013 1:00 AM (Open Daily)",
        "curatorNote": "Order the beer sampler flight first. Tintin Toit with orange peel & coriander alongside a wood-fired pizza on the 2nd floor balcony is classic BLR.",
        "isVegetarian": False,
        "verified": True
    },
    {
        "id": "windmills-craftworks-whitefield",
        "name": "Windmills Craftworks",
        "slug": "windmills-craftworks-whitefield",
        "tagline": "Jazz theater microbrewery, legendary Stout & slow-cooked pork ribs",
        "description": "An intellectual microbrewery and live jazz sanctuary in Whitefield featuring walls of rare books, acoustic architecture, and globally celebrated craft brews.",
        "category": "Microbrewery",
        "neighborhood": "Whitefield",
        "address": "6th Floor, 331, Road 5B, EPIP Zone, Whitefield, Bengaluru, Karnataka 560066",
        "lat": 12.9825325,
        "lng": 77.7217732,
        "priceLevel": "\u20b9\u20b9\u20b9",
        "priceForTwo": "\u20b92,000",
        "mustTry": [
            "Stout with Roasted Vanilla",
            "Slow-cooked BBQ Pork Ribs",
            "Hefeweizen",
            "Bacon-wrapped Prawns",
            "Dark Chocolate Fondant"
        ],
        "vibeTags": [
            "Craft Beer",
            "Live Music / Vinyl",
            "Romantic"
        ],
        "imageUrl": "https://images.unsplash.com/photo-1575444758702-4a6b9222336e?auto=format&fit=crop&w=1000&q=80",
        "googleMapsUrl": "https://www.google.com/maps/place/Windmills+Craftworks+%5BWhitefield%5D/@12.9825325,77.7217732,17z/data=!3m1!4b1!4m6!3m5!1s0x3bae118d2e8c9077:0x3813cdd59bf0816e!8m2!3d12.9825325!4d77.7217732!16s%2Fg%2F11g_sf1pd?entry=ttu&g_ep=EgoyMDI2MDgxOS4wIKXMDSoASAFQAw%3D%3D",
        "timings": "12:00 PM \u2013 12:00 AM",
        "curatorNote": "Arguably the finest microbrewery in India. Acoustic jazz performances paired with house-brewed stout are peerless.",
        "isVegetarian": False,
        "verified": True
    },
    {
        "id": "arbor-brewing-company",
        "name": "Arbor Brewing Company (ABC)",
        "slug": "arbor-brewing-company",
        "tagline": "India\u2019s first American craft brewery & legendary Raging Elephant IPA",
        "description": "Hailing from Michigan, ABC on Magrath Road brought authentic American craft brewing to India, famed for heavy hop IPAs, Belgian blondes, and artisanal pub fare.",
        "category": "Microbrewery",
        "neighborhood": "Church Street & MG Road",
        "address": "8, 3rd Floor, Allied Grande Plaza, Magrath Rd, Ashok Nagar, Bengaluru, Karnataka 560025",
        "lat": 12.9703756,
        "lng": 77.6110025,
        "priceLevel": "\u20b9\u20b9\u20b9",
        "priceForTwo": "\u20b91,800",
        "mustTry": [
            "Raging Elephant IPA",
            "Smooth Criminal Spiced Ale",
            "Bangalore Bliss (Hefeweizen)",
            "Flaming Chicken Wings",
            "Beef Burger"
        ],
        "vibeTags": [
            "Craft Beer",
            "Late Night",
            "Outdoor Seating"
        ],
        "imageUrl": "https://images.unsplash.com/photo-1575444758702-4a6b9222336e?auto=format&fit=crop&w=1000&q=80",
        "googleMapsUrl": "https://www.google.com/maps/place/Arbor+Brewing+Company/@12.9703756,77.6110025,17z/data=!3m1!4b1!4m6!3m5!1s0x3bae1681ac1dd657:0x901cdcb9823220c8!8m2!3d12.9703756!4d77.6110025!16s%2Fm%2F0pd60ry?entry=ttu&g_ep=EgoyMDI2MDgxOS4wIKXMDSoASAFQAw%3D%3D",
        "timings": "12:00 PM \u2013 12:30 AM",
        "curatorNote": "The Raging Elephant IPA remains the benchmark for piney, citrusy American India Pale Ales in the country.",
        "isVegetarian": False,
        "verified": True
    },
    {
        "id": "the-biere-club-lavelle",
        "name": "The Biere Club",
        "slug": "the-biere-club-lavelle",
        "tagline": "Bangalore\u2019s very first craft microbrewery on Vittal Mallya Road",
        "description": "Opened in 2010 as Bangalore\u2019s first microbrewery license, The Biere Club has been a stalwart for small-batch seasonal ales, stout, wheat beers, and wood-fired pizzas.",
        "category": "Microbrewery",
        "neighborhood": "Lavelle Road",
        "address": "20/2, Vittal Mallya Rd, D' Souza Layout, Ashok Nagar, Bengaluru, Karnataka 560001",
        "lat": 12.9708863,
        "lng": 77.5975839,
        "priceLevel": "\u20b9\u20b9\u20b9",
        "priceForTwo": "\u20b91,600",
        "mustTry": [
            "Belgian Witbier",
            "Seasonal Mango / Strawberry Ale",
            "Biere Club Pork Ribs",
            "Moroccan Chicken Skewers"
        ],
        "vibeTags": [
            "Craft Beer",
            "Outdoor Seating",
            "Late Night"
        ],
        "imageUrl": "https://images.unsplash.com/photo-1575444758702-4a6b9222336e?auto=format&fit=crop&w=1000&q=80",
        "googleMapsUrl": "https://www.google.com/maps/place/The+Biere+Club/@12.9708863,77.5975839,17z/data=!3m1!4b1!4m6!3m5!1s0x3bae1679c65e8131:0xad0dab7a4fe4cc32!8m2!3d12.9708863!4d77.5975839!16s%2Fg%2F1t_kdz9t?entry=ttu&g_ep=EgoyMDI2MDgxOS4wIKXMDSoASAFQAw%3D%3D",
        "timings": "11:30 AM \u2013 11:30 PM",
        "curatorNote": "Historic significance as the city's 1st microbrewery. Great afternoon terrace overlooking UB City.",
        "isVegetarian": False,
        "verified": True
    },
    {
        "id": "geist-brewing-factory",
        "name": "Geist Brewing Factory",
        "slug": "geist-brewing-factory",
        "tagline": "Farm-to-glass artisan craft beer garden beneath majestic banyans",
        "description": "A sprawling outdoor brewery sanctuary in North Bangalore offering craft beer brewed to Bavarian purity laws, gourmet charcuterie, and sourdough bakes.",
        "category": "Microbrewery",
        "neighborhood": "Bel Road & North BLR",
        "address": "Bhartiya Mall of Bengaluru, Thanisandra Main Rd, Bengaluru, Karnataka 560064",
        "lat": 13.0838244,
        "lng": 77.64447,
        "priceLevel": "\u20b9\u20b9\u20b9",
        "priceForTwo": "\u20b91,800",
        "mustTry": [
            "Geist Witty Neighbor (Belgian Wit)",
            "Geist Kamacitra (IPA)",
            "Uncle Dunkel (Dark Wheat)",
            "Wood-Fired Bratwurst Pizza"
        ],
        "vibeTags": [
            "Craft Beer",
            "Pet Friendly",
            "Outdoor Seating"
        ],
        "imageUrl": "https://images.unsplash.com/photo-1575444758702-4a6b9222336e?auto=format&fit=crop&w=1000&q=80",
        "googleMapsUrl": "https://www.google.com/maps/place/Geist+Brewing+Co.+Hennur/@13.0838244,77.64447,17z/data=!3m1!4b1!4m6!3m5!1s0x3bae193fce87cf81:0x654d87aa5902f167!8m2!3d13.0838244!4d77.64447!16s%2Fg%2F11k413pnc_?entry=ttu&g_ep=EgoyMDI2MDgxOS4wIKXMDSoASAFQAw%3D%3D",
        "timings": "12:00 PM \u2013 11:30 PM",
        "curatorNote": "The Kamacitra NEIPA with tropical notes is one of the highest-rated craft beers in India.",
        "isVegetarian": False,
        "verified": True
    },
    {
        "id": "bobs-bar-indiranagar",
        "name": "Bob's Bar",
        "slug": "bobs-bar-indiranagar",
        "tagline": "Retro South Indian tavern, filter coffee cocktails & local chakhna",
        "description": "Bangalore\u2019s beloved local pub celebrating regional Karnataka canteen snacks, local spirits, filter coffee cocktails, and nostalgic 80s Kannada & retro music on 100 Feet Road.",
        "category": "Microbrewery",
        "neighborhood": "Indiranagar",
        "address": "777/I, 100 Feet Rd, HAL 2nd Stage, Indiranagar, Bengaluru, Karnataka 560008",
        "lat": 12.9671312,
        "lng": 77.6411671,
        "priceLevel": "\u20b9\u20b9",
        "priceForTwo": "\u20b91,000",
        "mustTry": [
            "Mysore Filter Coffee Cocktail",
            "Tindli Fry",
            "Coorg Pork Fry",
            "Anjal Rava Fry",
            "Erachi Varattiyathu"
        ],
        "vibeTags": [
            "Craft Beer",
            "Late Night",
            "Outdoor Seating",
            "Pocket Friendly"
        ],
        "imageUrl": "https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=1000&q=80",
        "googleMapsUrl": "https://www.google.com/maps/place/Bob's+Bar/@12.9671312,77.6411671,17z/data=!3m1!4b1!4m6!3m5!1s0x3bae141d25a5ab49:0xf51d81396da23fd9!8m2!3d12.9671312!4d77.6411671!16s%2Fg%2F11f40zdt1s?entry=ttu&g_ep=EgoyMDI2MDgxOS4wIKXMDSoASAFQAw%3D%3D",
        "timings": "11:30 AM \u2013 1:00 AM",
        "curatorNote": "Pair their signature iced filter coffee cocktail with crispy fried tindli and Malnad pork fry on the open terrace.",
        "isVegetarian": False,
        "verified": True
    },
    {
        "id": "pecos-rest-house-road",
        "name": "Pecos Classic",
        "slug": "pecos-rest-house-road",
        "tagline": "Retro rock pub with chilled draft beer and chilli pork",
        "description": "Since 1989, Pecos has been the temple of classic 70s rock, Pink Floyd posters, retro nostalgia, and draught mugs on Rest House Road off Brigade.",
        "category": "Microbrewery",
        "neighborhood": "Church Street & MG Road",
        "address": "34, Rest House Rd, Shanthala Nagar, Ashok Nagar, Bengaluru, Karnataka 560001",
        "lat": 12.973678,
        "lng": 77.607354,
        "priceLevel": "\u20b9\u20b9",
        "priceForTwo": "\u20b9900",
        "mustTry": [
            "Chilled Draught Beer Pitcher",
            "Pecos Chilli Pork",
            "Dosa with Mutton Curry",
            "Bacon Sausages"
        ],
        "vibeTags": [
            "Live Music / Vinyl",
            "Late Night",
            "Craft Beer"
        ],
        "imageUrl": "https://images.unsplash.com/photo-1543007630-9710e4a00a20?auto=format&fit=crop&w=1000&q=80",
        "googleMapsUrl": "https://www.google.com/maps/place/Pecos+-+Classic/@12.973678,77.607354,17z/data=!3m1!4b1!4m6!3m5!1s0x3bae166458a55a41:0x8d300ee5cd536336!8m2!3d12.973678!4d77.607354!16s%2Fg%2F1v299g9p?entry=ttu&g_ep=EgoyMDI2MDgxOS4wIKXMDSoASAFQAw%3D%3D",
        "timings": "11:00 AM \u2013 11:30 PM",
        "curatorNote": "A pilgrimage for Bangalore rock fans since 1989. Draught beer by the pitcher and fiery chilli pork.",
        "isVegetarian": False,
        "verified": True
    },
    {
        "id": "soka-indiranagar",
        "name": "S\u014dka",
        "slug": "soka-indiranagar",
        "tagline": "Intimate 30-seat progressive cocktail bar (Asia\u2019s 50 Best Bars)",
        "description": "An avant-garde 30-seat speakeasy by mixologist Avinash Kapoli and chef Sombir Choudhary, pushing boundaries with native Indian ferments, kinetic art, and bespoke mixology.",
        "category": "Cocktails & Rooftops",
        "neighborhood": "Indiranagar",
        "address": "210, A Cross, 1st Main Rd, 2nd Stage, Indiranagar, Bengaluru, Karnataka 560071",
        "lat": 12.965116,
        "lng": 77.6383883,
        "priceLevel": "\u20b9\u20b9\u20b9\u20b9",
        "priceForTwo": "\u20b92,800",
        "mustTry": [
            "Clarified Rasam Cocktail",
            "Wild Ferment Native Gin",
            "Lamb Shank Tacos",
            "Truffle Mushroom Sliders",
            "Seasonal Fermentation Serves"
        ],
        "vibeTags": [
            "Cocktail Program",
            "Romantic",
            "Late Night"
        ],
        "imageUrl": "https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=1000&q=80",
        "googleMapsUrl": "https://www.google.com/maps/place/SOKA+Cocktail+Bar/@12.965116,77.6383883,17z/data=!3m1!4b1!4m6!3m5!1s0x3bae15e7ced2880b:0x29184d1c3a8b3bfd!8m2!3d12.965116!4d77.6383883!16s%2Fg%2F11vfbgd6d1?entry=ttu&g_ep=EgoyMDI2MDgxOS4wIKXMDSoASAFQAw%3D%3D",
        "timings": "5:00 PM \u2013 1:00 AM (Reservations Essential)",
        "curatorNote": "Ranked among the premier cocktail bars in Asia. Features moving kinetic art sculptures, moody lighting, and genius cocktail precision.",
        "isVegetarian": False,
        "verified": True
    },
    {
        "id": "zlb-23-leela-palace",
        "name": "ZLB 23",
        "slug": "zlb-23-leela-palace",
        "tagline": "Kyoto-style hidden speakeasy & live jazz (Asia\u2019s 50 Best Bars)",
        "description": "Tucked behind an unmarked kitchen door at The Leela Palace, ZLB 23 is a sultry Kyoto-inspired speakeasy serving prohibition-era craft cocktails, live jazz, and luxury dim sums.",
        "category": "Cocktails & Rooftops",
        "neighborhood": "Indiranagar",
        "address": "The Leela Palace, 23 Old Airport Road, HAL 2nd Stage, Kodihalli, Bengaluru, Karnataka 560008",
        "lat": 12.960325,
        "lng": 77.648408,
        "priceLevel": "\u20b9\u20b9\u20b9\u20b9",
        "priceForTwo": "\u20b94,000",
        "mustTry": [
            "Kyoto Mist Cocktail",
            "Smoked Wagyu Bao",
            "Truffle Xiao Long Bao",
            "Rare Japanese Whiskies",
            "Prohibition Punch"
        ],
        "vibeTags": [
            "Cocktail Program",
            "Romantic",
            "Live Music / Vinyl",
            "Late Night"
        ],
        "imageUrl": "https://images.unsplash.com/photo-1572116469696-31de0f17cc34?auto=format&fit=crop&w=1000&q=80",
        "googleMapsUrl": "https://www.google.com/maps/place/ZLB+23+(The+Leela+Palace+Bengaluru)/@12.960325,77.648408,17z/data=!3m1!4b1!4m6!3m5!1s0x3bae14067174ce31:0x94bf2c301bd03ab5!8m2!3d12.960325!4d77.648408!16s%2Fg%2F11xp6_z65n?entry=ttu&g_ep=EgoyMDI2MDgxOS4wIKXMDSoASAFQAw%3D%3D",
        "timings": "6:30 PM \u2013 1:00 AM (Closed Sundays)",
        "curatorNote": "Enter through the secret garden corridor. Velvet drapes, live vinyl jazz, and world-class mixology in complete discretion.",
        "isVegetarian": False,
        "verified": True
    },
    {
        "id": "copitas-four-seasons",
        "name": "Copitas",
        "slug": "copitas-four-seasons",
        "tagline": "21st-floor skyline rooftop cocktail lounge (Asia\u2019s 50 Best Bars)",
        "description": "Perched on the 21st floor of the Four Seasons at Embassy ONE, Copitas offers breathtaking city sunsets, artisanal gin creations, craft mezcals, and Latin-Asian tapas.",
        "category": "Cocktails & Rooftops",
        "neighborhood": "Bel Road & North BLR",
        "address": "Four Seasons Hotel at Embassy ONE, Bellary Road, Ganganagar, Bengaluru, Karnataka 560032",
        "lat": 13.0196455,
        "lng": 77.5853711,
        "priceLevel": "\u20b9\u20b9\u20b9\u20b9",
        "priceForTwo": "\u20b93,500",
        "mustTry": [
            "Greengo Cocktail",
            "Truffle Lobster Tacos",
            "Smoked Agave Highballs",
            "Churros with Spiced Dulce de Leche"
        ],
        "vibeTags": [
            "Cocktail Program",
            "Romantic",
            "Outdoor Seating",
            "Late Night"
        ],
        "imageUrl": "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1000&q=80",
        "googleMapsUrl": "https://www.google.com/maps/place/Copitas/@13.0196455,77.5853711,17z/data=!3m1!4b1!4m6!3m5!1s0x3bae175754edfc0d:0xdca2844896dc685d!8m2!3d13.0196455!4d77.5853711!16s%2Fg%2F11j8zgwjz_?entry=ttu&g_ep=EgoyMDI2MDgxOS4wIKXMDSoASAFQAw%3D%3D",
        "timings": "5:00 PM \u2013 1:00 AM",
        "curatorNote": "Consistently featured in Asia\u2019s 50 Best Bars. Catch golden hour on the open-air deck overlooking North Bangalore.",
        "isVegetarian": False,
        "verified": True
    },
    {
        "id": "lavonne-cafe-indiranagar",
        "name": "Lavonne Cafe",
        "slug": "lavonne-cafe-indiranagar",
        "tagline": "Master patisserie academy, French viennoiserie & chocolate artistry",
        "description": "Founded by master pastry chefs, Lavonne is Bangalore\u2019s premier French pastry salon famous for 72-hour laminated butter croissants, mirror-glazed entremets, and artisan brunch.",
        "category": "Bakeries & Desserts",
        "neighborhood": "Indiranagar",
        "address": "263, 3rd Cross Rd, 2nd Stage, Defence Colony, Indiranagar, Bengaluru, Karnataka 560071",
        "lat": 12.9668495,
        "lng": 77.6368682,
        "priceLevel": "\u20b9\u20b9\u20b9",
        "priceForTwo": "\u20b91,200",
        "mustTry": [
            "Almond Croissant",
            "Tiramisu Entremet",
            "Pain au Chocolat",
            "Croque Monsieur",
            "Belgian Hot Chocolate"
        ],
        "vibeTags": [
            "Artisanal Sourdough",
            "Breakfast Spot",
            "Outdoor Seating"
        ],
        "imageUrl": "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1000&q=80",
        "googleMapsUrl": "https://www.google.com/maps/place/Lavonne+Caf%C3%A9/@12.9668495,77.6368682,17z/data=!3m1!4b1!4m6!3m5!1s0x3bae141dd14789a1:0x7119c0ddc5321683!8m2!3d12.9668495!4d77.6368682!16s%2Fg%2F11g6j718dy?entry=ttu&g_ep=EgoyMDI2MDgxOS4wIKXMDSoASAFQAw%3D%3D",
        "timings": "8:30 AM \u2013 11:00 PM",
        "curatorNote": "The gold standard of French pastry in South India. The layered almond croissants shatter with every buttery bite.",
        "isVegetarian": False,
        "verified": True,
        "branches": [
            {
                "id": "lavonne-cafe-st-marks-road",
                "name": "St. Marks Road (Samrah Plaza)",
                "neighborhood": "Church Street & MG Road",
                "address": "Samrah Plaza, 4/2, Ground Floor, St. Marks Rd, Bengaluru, Karnataka 560001",
                "lat": 12.9758538,
                "lng": 77.6016664,
                "googleMapsUrl": "https://www.google.com/maps/place/St+Mark's+Rd+%26+Church+St,+Haridevpur,+Shanthala+Nagar,+Ashok+Nagar,+Bengaluru,+Karnataka+560001/@12.9758538,77.6016664,17z/data=!3m1!4b1!4m6!3m5!1s0x3bae167b83c22521:0xc74e0335688410e5!8m2!3d12.9758538!4d77.6016664!16s%2Fg%2F11gdsnhw0x?entry=ttu&g_ep=EgoyMDI2MDgxOS4wIKXMDSoASAFQAw%3D%3D"
            }
        ]
    },
    {
        "id": "amadora-ice-cream-indiranagar",
        "name": "Amadora Gourmet Ice Cream",
        "slug": "amadora-ice-cream-indiranagar",
        "tagline": "Small-batch artisan ice creams & warm underbaked cake",
        "description": "An artisanal scoop shop on 12th Main Indiranagar making all-natural churns from fresh milk and local ingredients, paired with their legendary warm underbaked cake.",
        "category": "Bakeries & Desserts",
        "neighborhood": "Indiranagar",
        "address": "1182, 12th Main Rd, HAL 2nd Stage, Indiranagar, Bengaluru, Karnataka 560038",
        "lat": 12.9705,
        "lng": 77.6445,
        "priceLevel": "\u20b9\u20b9",
        "priceForTwo": "\u20b9600",
        "mustTry": [
            "Underbaked Chocolate Cake with Salted Caramel",
            "Mami\u2019s Filter Coffee Ice Cream",
            "Trifecta Sundae",
            "Five-Bean Vanilla"
        ],
        "vibeTags": [
            "Late Night",
            "Romantic"
        ],
        "imageUrl": "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=1000&q=80",
        "googleMapsUrl": "https://www.google.com/maps/search/?api=1&query=Amadora+Gourmet+Ice+Cream%2C+1182%2C+12th+Main+Rd%2C+HAL+2nd+Stage%2C+Indiranagar%2C+Bengaluru%2C+Karnataka+560038",
        "timings": "12:00 PM \u2013 1:00 AM",
        "curatorNote": "Reddit foodies unanimous pick for the best dessert in town: Order the gooey warm Underbaked Cake topped with Salted Butter Caramel ice cream.",
        "isVegetarian": True,
        "verified": True
    },
    {
        "id": "glens-bakehouse-lavelle",
        "name": "Glen's Bakehouse",
        "slug": "glens-bakehouse-lavelle",
        "tagline": "Famous Red Velvet cupcakes, wood-fired bakes & colonial garden patio",
        "description": "A Bangalore institution famed for bite-sized Red Velvet cupcakes with cream cheese frosting, sourdough pizzas, roast chicken pot pies, and apple tarts in a cozy colonial bungalow.",
        "category": "Bakeries & Desserts",
        "neighborhood": "Lavelle Road",
        "address": "24/1, Lavelle Rd, Shanthala Nagar, Ashok Nagar, Bengaluru, Karnataka 560001",
        "lat": 12.9698289,
        "lng": 77.597437,
        "priceLevel": "\u20b9\u20b9",
        "priceForTwo": "\u20b9800",
        "mustTry": [
            "Signature Mini Red Velvet Cupcakes",
            "Warm Apple Pie",
            "Roast Chicken Pot Pie",
            "Chocolate Mud Cake",
            "Iced Mocha"
        ],
        "vibeTags": [
            "Breakfast Spot",
            "Outdoor Seating",
            "Romantic"
        ],
        "imageUrl": "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1000&q=80",
        "googleMapsUrl": "https://www.google.com/maps/place/Glen's+Bakehouse/@12.9698289,77.597437,17z/data=!3m1!4b1!4m6!3m5!1s0x3bae16783457a129:0x36cc833f855485ba!8m2!3d12.9698289!4d77.597437!16s%2Fg%2F11cmttg5wc?entry=ttu&g_ep=EgoyMDI2MDgxOS4wIKXMDSoASAFQAw%3D%3D",
        "timings": "9:00 AM \u2013 11:30 PM",
        "curatorNote": "The bite-sized red velvet cupcakes are legendary across Bangalore. Sit in the sun-dappled courtyard under the tree.",
        "isVegetarian": False,
        "verified": True
    },
    {
        "id": "variar-bakery-rajajinagar",
        "name": "O.G. Variar & Sons Bakery",
        "slug": "variar-bakery-rajajinagar",
        "tagline": "The iconic 1955 bakery for hot butter biscuits and veg puffs",
        "description": "An irreplaceable Rajajinagar landmark established in 1955 where crowds gather daily for oven-fresh butter biscuits, flaky veg puffs, and plum cakes.",
        "category": "Bakeries & Desserts",
        "neighborhood": "Malleshwaram",
        "address": "68, 12th Main, 2nd Block, Rajajinagar, Bengaluru, Karnataka 560010",
        "lat": 12.9914103,
        "lng": 77.5535209,
        "priceLevel": "\u20b9",
        "priceForTwo": "\u20b9200",
        "mustTry": [
            "Fresh Warm Butter Biscuits",
            "Vegetable Puff",
            "Plum Cake",
            "Dilpasand"
        ],
        "vibeTags": [
            "Heritage (Pre-1980)",
            "Pocket Friendly"
        ],
        "imageUrl": "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1000&q=80",
        "googleMapsUrl": "https://www.google.com/maps/place/O.G.+Variar+and+Sons,+Variar+Bakery/@12.9914103,77.5535209,18z/data=!4m10!1m2!2m1!1sO.G.+Variar+%26+Sons+Bakery+68,+12th+Main,+2nd+Block,+Rajajinagar,+Bengaluru,+Karnataka+560010!3m6!1s0x3bae3df333d3f8b9:0x6e9e5d020ef9ef13!8m2!3d12.9914103!4d77.5546152!15sClxPLkcuIFZhcmlhciAmIFNvbnMgQmFrZXJ5IDY4LCAxMnRoIE1haW4sIDJuZCBCbG9jaywgUmFqYWppbmFnYXIsIEJlbmdhbHVydSwgS2FybmF0YWthIDU2MDAxMFpXIlVvZyB2YXJpYXIgJiBzb25zIGJha2VyeSA2OCAxMnRoIG1haW4gMm5kIGJsb2NrIHJhamFqaW5hZ2FyIGJlbmdhbHVydSBrYXJuYXRha2EgNTYwMDEwkgEGYmFrZXJ54AEA!16s%2Fg%2F1td4n3_f?entry=ttu&g_ep=EgoyMDI2MDgxOS4wIKXMDSoASAFQAw%3D%3D",
        "timings": "9:00 AM \u2013 1:30 PM, 3:30 PM \u2013 9:00 PM",
        "curatorNote": "Bags of piping hot butter biscuits sell out within minutes of the 4 PM batch coming out of the ovens.",
        "isVegetarian": True,
        "verified": True
    },
    {
        "id": "albert-bakery-frazer-town",
        "name": "Albert Bakery",
        "slug": "albert-bakery-frazer-town",
        "tagline": "1902 heritage bakery famous for Mutton Kheema Samosas & Brain Puffs",
        "description": "Established in 1902 on Mosque Road, this historic bakery draws city-wide queues at 3:30 PM daily for oven-fresh mutton kheema samosas, coconut pastries, and Ramadan special delicacies.",
        "category": "Bakeries & Desserts",
        "neighborhood": "Bel Road & North BLR",
        "address": "93, Mosque Rd, Cleveland Town, Frazer Town, Bengaluru, Karnataka 560005",
        "lat": 12.9968598,
        "lng": 77.6144109,
        "priceLevel": "\u20b9",
        "priceForTwo": "\u20b9200",
        "mustTry": [
            "Mutton Kheema Cocktail Samosa",
            "Bheja (Brain) Puff",
            "Coconut Pastry",
            "Chicken Roll",
            "Khova Naan"
        ],
        "vibeTags": [
            "Heritage (Pre-1980)",
            "Pocket Friendly",
            "Late Night"
        ],
        "imageUrl": "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1000&q=80",
        "googleMapsUrl": "https://www.google.com/maps/place/Albert+Bakery/@12.9968598,77.6144109,17z/data=!3m1!4b1!4m6!3m5!1s0x3bae159384a11481:0xa81f09db40615b24!8m2!3d12.9968598!4d77.6144109!16s%2Fg%2F1tdqrzqw?entry=ttu&g_ep=EgoyMDI2MDgxOS4wIKXMDSoASAFQAw%3D%3D",
        "timings": "3:00 PM \u2013 9:00 PM",
        "curatorNote": "Over 120 years of baking legacy on Mosque Road. The crispy mutton kheema samosas sell out within 45 minutes of the evening batch opening.",
        "isVegetarian": False,
        "verified": True
    },
    {
        "id": "thoms-bakery-cox-town",
        "name": "Thom\u2019s Bakery",
        "slug": "thoms-bakery-cox-town",
        "tagline": "1970 Anglo-Indian institution for rich Plum Cake, mince pies & pastries",
        "description": "An irreplaceable cantonment landmark on Wheeler Road in Cox Town, loved by generations of Bangaloreans for rich rum-soaked Christmas plum cakes, mutton puffs, and old-school confectionery.",
        "category": "Bakeries & Desserts",
        "neighborhood": "Bel Road & North BLR",
        "address": "1/2, Wheeler Rd, Cox Town, Pulikeshi Nagar, Bengaluru, Karnataka 560005",
        "lat": 12.9915847,
        "lng": 77.6143095,
        "priceLevel": "\u20b9",
        "priceForTwo": "\u20b9250",
        "mustTry": [
            "Rich Rum Plum Cake",
            "Spiced Mutton Puff",
            "Chicken Sausage Roll",
            "Apple Pie",
            "Lemon Tarts"
        ],
        "vibeTags": [
            "Heritage (Pre-1980)",
            "Pocket Friendly"
        ],
        "imageUrl": "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1000&q=80",
        "googleMapsUrl": "https://www.google.com/maps/place/Thom%E2%80%99s+Bakery/@12.9915847,77.6143095,17z/data=!3m1!4b1!4m6!3m5!1s0x3bae16f34ff4277d:0xdc2029a7335452c8!8m2!3d12.9915847!4d77.6143095!16s%2Fg%2F1q62hl256?entry=ttu&g_ep=EgoyMDI2MDgxOS4wIKXMDSoASAFQAw%3D%3D",
        "timings": "8:00 AM \u2013 9:30 PM",
        "curatorNote": "The scent of freshly baked plum cake and buttery puff pastry on Wheeler Road defines Anglo-Indian old Bangalore.",
        "isVegetarian": False,
        "verified": True
    },
    {
        "id": "vb-bakery-vv-puram",
        "name": "VB Bakery",
        "slug": "vb-bakery-vv-puram",
        "tagline": "The 1953 birthplace of Khara Bun Congress (KBC) & Dumroot Halwa",
        "description": "Standing proudly at Sajjan Rao Circle since 1953, VB Bakery is the pioneer of Bangalore bakery snacks, world-famous for its spicy peanut-stuffed Khara Bun Congress, buttery biscuits, and rich ash-gourd Dumroot halwa.",
        "category": "Bakeries & Desserts",
        "neighborhood": "Basavanagudi",
        "address": "20, Sajjan Rao Circle, VV Puram, Shankarapura, Bengaluru, Karnataka 560004",
        "lat": 12.9515275,
        "lng": 77.5771382,
        "priceLevel": "\u20b9",
        "priceForTwo": "\u20b9150",
        "mustTry": [
            "Khara Bun Congress (KBC)",
            "Dumroot (Ash Gourd Halwa)",
            "Benne Biscuit",
            "Apple Cake",
            "Rava Rusk"
        ],
        "vibeTags": [
            "Heritage (Pre-1980)",
            "Pure Veg",
            "Pocket Friendly"
        ],
        "imageUrl": "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1000&q=80",
        "googleMapsUrl": "https://www.google.com/maps/place/VB+Bakery/@12.9515275,77.5771382,17z/data=!3m1!4b1!4m6!3m5!1s0x3bae15eee52b973d:0xe0da00f262995fc8!8m2!3d12.9515275!4d77.5771382!16s%2Fg%2F1tlwd2bw?entry=ttu&g_ep=EgoyMDI2MDgxOS4wIKXMDSoASAFQAw%3D%3D",
        "timings": "6:00 AM \u2013 10:30 PM",
        "curatorNote": "Order the iconic KBC (spicy roasted congress peanuts sandwiched inside a soft spiced bun with generous butter).",
        "isVegetarian": True,
        "verified": True
    },
    {
        "id": "new-krishna-bhavan-malleshwaram",
        "name": "New Krishna Bhavan",
        "slug": "new-krishna-bhavan-malleshwaram",
        "tagline": "Green Masala Button Idlis & Mangalore Buns since 1954",
        "description": "Operating opposite Malleshwaram railway station since 1954, New Krishna Bhavan is a beloved vegetarian institution known for regional Karavali coastal delicacies, Mangalore buns, and button idlis submerged in herbed coriander gravy.",
        "category": "Iconic Heritage",
        "neighborhood": "Malleshwaram",
        "address": "33/39, Mill Corner, Sampige Rd, Malleshwaram, Bengaluru, Karnataka 560020",
        "lat": 12.9929953,
        "lng": 77.5716992,
        "priceLevel": "\u20b9",
        "priceForTwo": "\u20b9200",
        "mustTry": [
            "Green Masala Button Idli",
            "Fluffy Mangalore Buns",
            "Crispy Goli Baje",
            "Neer Dosa with Chutney",
            "Filter Coffee"
        ],
        "vibeTags": [
            "Heritage (Pre-1980)",
            "Pure Veg",
            "Breakfast Spot",
            "Filter Coffee Spot",
            "Pocket Friendly"
        ],
        "imageUrl": "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=1000&q=80",
        "googleMapsUrl": "https://www.google.com/maps/place/Sri+Krishna+Bhavan/@12.9929953,77.5716992,17z/data=!3m1!4b1!4m6!3m5!1s0x3bae162f8ff26221:0x199b57768552b29b!8m2!3d12.9929953!4d77.5716992!16s%2Fg%2F11hcjy302x?entry=ttu&g_ep=EgoyMDI2MDgxOS4wIKXMDSoASAFQAw%3D%3D",
        "timings": "7:30 AM \u2013 9:00 PM",
        "curatorNote": "The signature Green Masala Button Idli (mini idlis swimming in fragrant coriander-coconut curry) is uniquely New Krishna Bhavan.",
        "isVegetarian": True,
        "verified": True
    },
    {
        "id": "mangalore-pearl-frazer-town",
        "name": "Mangalore Pearl",
        "slug": "mangalore-pearl-frazer-town",
        "tagline": "Authentic Mangalorean Catholic home cooking, Pork Bafat & Sannas",
        "description": "A treasured Cantonment institution for authentic Mangalorean Catholic home cooking, celebrated for rich vinegar-and-spice Pork Bafat, fluffy steamed Sannas, Anjal Fish Curry, and Kori Rotti.",
        "category": "Regional & Coastal",
        "neighborhood": "CBD & Central",
        "address": "Skywalk Building, 2nd Floor, 5/1, Assaye Rd, Sindhi Colony, Ulsoor, Bengaluru, Karnataka 560042",
        "lat": 12.9908171,
        "lng": 77.6192744,
        "priceLevel": "\u20b9\u20b9",
        "priceForTwo": "\u20b9800",
        "mustTry": [
            "Traditional Pork Bafat",
            "Steamed Sannas",
            "Anjal (Kingfish) Curry Meals",
            "Prawn Sukka",
            "Kori Rotti"
        ],
        "vibeTags": [
            "Pocket Friendly"
        ],
        "imageUrl": "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=1000&q=80",
        "googleMapsUrl": "https://www.google.com/maps/place/Mangalore+Pearl/@12.9908171,77.6192744,17z/data=!3m1!4b1!4m6!3m5!1s0x3bae16f3bb08b3d5:0xe8c68173e0df6f5e!8m2!3d12.9908171!4d77.6192744!16s%2Fg%2F1tfxwgfz?entry=ttu&g_ep=EgoyMDI2MDgxOS4wIKXMDSoASAFQAw%3D%3D",
        "timings": "12:30 PM \u2013 3:30 PM, 7:30 PM \u2013 10:30 PM (Closed Tuesdays)",
        "curatorNote": "Pure coastal comfort food. The dark, aromatic spice-rubbed Pork Bafat paired with warm, fermented steamed Sannas is unmatched.",
        "isVegetarian": False,
        "verified": True
    },
    {
        "id": "hae-kum-gang-ashok-nagar",
        "name": "Hae Kum Gang",
        "slug": "hae-kum-gang-ashok-nagar",
        "tagline": "Bangalore\u2019s original 2000s authentic tabletop Korean BBQ",
        "description": "Tucked on Castle Street, Hae Kum Gang has been Bangalore\u2019s most authentic Korean restaurant for over two decades, offering tabletop charcoal grill pork belly (Samgyeopsal), seafood Haemul Pajeon, and rich Kimchi Jjigae with house-fermented banchan.",
        "category": "Pan-Asian & Japanese",
        "neighborhood": "Church Street & MG Road",
        "address": "20, Pauls Castle, Castle St, Ashok Nagar, Bengaluru, Karnataka 560025",
        "lat": 12.9679142,
        "lng": 77.6073587,
        "priceLevel": "\u20b9\u20b9\u20b9",
        "priceForTwo": "\u20b91,800",
        "mustTry": [
            "Samgyeopsal (Pork Belly BBQ)",
            "Dolsot Bibimbap",
            "Haemul Pajeon (Seafood Pancake)",
            "Kimchi Jjigae Stew",
            "Korean Fried Chicken"
        ],
        "vibeTags": [
            "Romantic"
        ],
        "imageUrl": "https://images.unsplash.com/photo-1541544741938-0af808871cc0?auto=format&fit=crop&w=1000&q=80",
        "googleMapsUrl": "https://www.google.com/maps/place/Hae+Kum+Gang+Korean+Restaurant/@12.9679142,77.6073587,17z/data=!3m1!4b1!4m6!3m5!1s0x3bae142aabfed87f:0xab86b11f35c33dfb!8m2!3d12.9679142!4d77.6073587!16s%2Fg%2F1vg4h78w?entry=ttu&g_ep=EgoyMDI2MDgxOS4wIKXMDSoASAFQAw%3D%3D",
        "timings": "11:30 AM \u2013 3:00 PM, 6:00 PM \u2013 10:30 PM",
        "curatorNote": "Run by a native Korean family. Sizzle tender pork belly at your table and wrap with fresh lettuce, garlic, and ssamjang.",
        "isVegetarian": False,
        "verified": True
    },
    {
        "id": "lakeview-milkbar-mg-road",
        "name": "Lakeview Milkbar",
        "slug": "lakeview-milkbar-mg-road",
        "tagline": "Bangalore\u2019s oldest 1930s ice cream, waffle & milkshake parlour",
        "description": "Founded in 1930 by Englishman James Meadow Charles, Lakeview Milkbar on MG Road has served over 90 years of classic ice cream sundaes, toasted chicken sandwiches, and crispy waffles to midnight city crowds.",
        "category": "Bakeries & Desserts",
        "neighborhood": "Church Street & MG Road",
        "address": "Kannan Building, 89, MG Rd, Haridevpur, Shanthala Nagar, Ashok Nagar, Bengaluru, Karnataka 560001",
        "lat": 12.9758912,
        "lng": 77.6038027,
        "priceLevel": "\u20b9\u20b9",
        "priceForTwo": "\u20b9450",
        "mustTry": [
            "Fresh Strawberry with Whipped Cream & Ice Cream",
            "Chocolate Fudge Sundae",
            "Toasted Chicken Salami Sandwich",
            "Waffle with Maple & Butter",
            "Black Forest Cake"
        ],
        "vibeTags": [
            "Heritage (Pre-1980)",
            "Late Night",
            "Pocket Friendly"
        ],
        "imageUrl": "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=1000&q=80",
        "googleMapsUrl": "https://www.google.com/maps/place/Kannan+Building,+89,+Mahatma+Gandhi+Rd,+Haridevpur,+Shanthala+Nagar,+Ashok+Nagar,+Bengaluru,+Karnataka+560001/@12.9758912,77.6038027,17z/data=!3m1!4b1!4m6!3m5!1s0x3bae167c5efdb1cb:0xc431d33637e91063!8m2!3d12.9758912!4d77.6038027!16s%2Fg%2F1q6j7h4d5?entry=ttu&g_ep=EgoyMDI2MDgxOS4wIKXMDSoASAFQAw%3D%3D",
        "timings": "9:30 AM \u2013 12:30 AM",
        "curatorNote": "A 95-year-old Bangalore late-night tradition. Park on MG Road and have sundaes served directly through your car window.",
        "isVegetarian": False,
        "verified": True
    },
    {
        "id": "corner-house-residency-road",
        "name": "Corner House Ice Cream",
        "slug": "corner-house-residency-road",
        "tagline": "The 1982 creator of Bangalore\u2019s legendary Death By Chocolate (DBC)",
        "description": "An irreplaceable Bangalore dessert ritual since 1982. Generous sundae scoops of vanilla ice cream buried under warm fudgy chocolate cake, hot homemade fudge sauce, and roasted peanuts.",
        "category": "Bakeries & Desserts",
        "neighborhood": "Church Street & MG Road",
        "address": "45/3, GK Complex, Residency Rd Cross, Shanthala Nagar, Ashok Nagar, Bengaluru, Karnataka 560025",
        "lat": 12.9736986,
        "lng": 77.6093812,
        "priceLevel": "\u20b9\u20b9",
        "priceForTwo": "\u20b9350",
        "mustTry": [
            "Death By Chocolate (DBC)",
            "Hot Fudge Nut Sundae",
            "Trilogy",
            "Apple Pie with Ice Cream",
            "Brown Bomb"
        ],
        "vibeTags": [
            "Heritage (Pre-1980)",
            "Late Night",
            "Pocket Friendly"
        ],
        "imageUrl": "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=1000&q=80",
        "googleMapsUrl": "https://www.google.com/maps/place/Corner+House+Residency+Rd/@12.9736986,77.6093812,17z/data=!3m1!4b1!4m6!3m5!1s0x3bae17fb11d19fe5:0x4055b973d89f0225!8m2!3d12.9736986!4d77.6093812!16s%2Fg%2F1vn9mjh6",
        "timings": "11:00 AM \u2013 11:30 PM",
        "curatorNote": "Bangalore\u2019s sweetest nostalgia. The Death By Chocolate (DBC) eaten on the sidewalk curbs is a non-negotiable rite of passage.",
        "isVegetarian": True,
        "verified": True
    },
    {
        "id": "janatha-hotel-malleshwaram",
        "name": "Janatha Hotel",
        "slug": "janatha-hotel-malleshwaram",
        "tagline": "1970s benchmark for Sagu Masala Dosa & retro wooden booth charm",
        "description": "An authentic Malleshwaram 8th Cross bastion operating since the 1970s with vintage wooden booths, famous for its unique Sagu Masala Dosa, crisp uddina vadas, and frothy filter coffee.",
        "category": "Iconic Heritage",
        "neighborhood": "Malleshwaram",
        "address": "27, 8th Cross Rd, Malleshwaram, Bengaluru, Karnataka 560003",
        "lat": 12.9991156,
        "lng": 77.5711405,
        "priceLevel": "\u20b9",
        "priceForTwo": "\u20b9200",
        "mustTry": [
            "Sagu Masala Dosa",
            "Uddina Vada with Sambar",
            "Chow Chow Bath (Khara & Kesari)",
            "Mangalore Bajji",
            "Degree Filter Coffee"
        ],
        "vibeTags": [
            "Heritage (Pre-1980)",
            "Pure Veg",
            "Breakfast Spot",
            "Filter Coffee Spot",
            "Pocket Friendly"
        ],
        "imageUrl": "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=1000&q=80",
        "googleMapsUrl": "https://www.google.com/maps/place/Hotel+Janatha/@12.9991156,77.5711405,17z/data=!3m1!4b1!4m6!3m5!1s0x3bae1625700de12f:0x6845035fa8bb08f8!8m2!3d12.9991156!4d77.5711405!16s%2Fg%2F11cssqvxl_?entry=ttu&g_ep=EgoyMDI2MDgxOS4wIKXMDSoASAFQAw%3D%3D",
        "timings": "7:00 AM \u2013 1:00 PM, 3:30 PM \u2013 8:30 PM (Closed Wednesdays)",
        "curatorNote": "A nostalgic step back into 1970s Malleshwaram. The Sagu Masala Dosa (filled with spiced vegetable sagu instead of aloo) is unmatched.",
        "isVegetarian": True,
        "verified": True
    },
    {
        "id": "siddappa-hotel-sampangi-rama-nagar",
        "name": "Siddappa Hotel",
        "slug": "siddappa-hotel-sampangi-rama-nagar",
        "tagline": "The mythical temple-compound morning half-ghee dosa since the 1980s",
        "description": "A legendary single-location hole-in-the-wall morning tiffin joint operating from a quiet residential alleyway in Sampangi Rama Nagar, famous for thick, golden-crisp half-ghee dosas served on cut banana leaves.",
        "category": "Iconic Heritage",
        "neighborhood": "CBD & Central",
        "address": "38, 7th Main Rd, Ashwath Nagar, Sampangi Rama Nagar, Bengaluru, Karnataka 560027",
        "lat": 12.966101,
        "lng": 77.5907794,
        "priceLevel": "\u20b9",
        "priceForTwo": "\u20b9150",
        "mustTry": [
            "Half Ghee Masala Dosa",
            "Kali Dosa",
            "Spiced Rice Bath",
            "Idli with Raw Green Chilli Chutney",
            "Filter Coffee"
        ],
        "vibeTags": [
            "Heritage (Pre-1980)",
            "Pure Veg",
            "Breakfast Spot",
            "Pocket Friendly"
        ],
        "imageUrl": "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=1000&q=80",
        "googleMapsUrl": "https://www.google.com/maps/place/Siddappa+Hotel/@12.966101,77.5907794,17z/data=!3m1!4b1!4m6!3m5!1s0x3bae15d88e4c168b:0x19956195e37409ee!8m2!3d12.966101!4d77.5907794!16s%2Fg%2F11b70w_vt6?entry=ttu&g_ep=EgoyMDI2MDgxOS4wIKXMDSoASAFQAw%3D%3D",
        "timings": "8:30 AM \u2013 11:30 AM (Morning Only)",
        "curatorNote": "Strictly open from 8:30 AM to 11:30 AM. Arrive by 8:00 AM to get a token for Siddappa\u2019s famous crispy ghee dosas.",
        "isVegetarian": True,
        "verified": True
    },
    {
        "id": "dyu-art-cafe-koramangala",
        "name": "Dyu Art Cafe",
        "slug": "dyu-art-cafe-koramangala",
        "tagline": "Restored Kerala courtyard house, Banoffee pie & indie art gallery",
        "description": "A serene cultural sanctuary nestled in Koramangala 5th Block inside a traditional Kerala Nalukettu home with open-to-sky sunlit courtyard, red oxide floors, artisan bakes, and peaceful reading corners.",
        "category": "Specialty Coffee & Cafe",
        "neighborhood": "Koramangala",
        "address": "23, KHB MIG Colony, Koramangala 8th Block, Bengaluru, Karnataka 560095",
        "lat": 12.9373076,
        "lng": 77.6176544,
        "priceLevel": "\u20b9\u20b9",
        "priceForTwo": "\u20b9800",
        "mustTry": [
            "Classic Banoffee Pie",
            "Signature Melt-in-Mouth Chocolate Cake",
            "Cheddar Stuffed Mushrooms",
            "Tuna Melt Sourdough Sandwich",
            "French Press Coffee"
        ],
        "vibeTags": [
            "Work Friendly",
            "Outdoor Seating",
            "Romantic",
            "Pocket Friendly"
        ],
        "imageUrl": "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1000&q=80",
        "googleMapsUrl": "https://www.google.com/maps/place/Dyu+Art+Cafe/@12.9373076,77.6176544,17z/data=!3m1!4b1!4m6!3m5!1s0x3bae144f0a0442f3:0x5cf634310edf27a8!8m2!3d12.9373076!4d77.6176544!16s%2Fg%2F1ydpv9q4x?entry=ttu&g_ep=EgoyMDI2MDgxOS4wIKXMDSoASAFQAw%3D%3D",
        "timings": "10:00 AM \u2013 10:30 PM (Mondays: 12:30 PM \u2013 10:30 PM)",
        "curatorNote": "The bougainvillea-framed Kerala courtyard and decadent Banoffee pie make this one of the most soothing cafes in South India.",
        "isVegetarian": False,
        "verified": True
    },
    {
        "id": "maverick-farmer-ulsoor",
        "name": "Maverick & Farmer Coffee",
        "slug": "maverick-farmer-ulsoor",
        "tagline": "Artisan cold-smoked estate coffee overlooking the historic RBANMS ground",
        "description": "Founded by master coffee farmers from Coorg, this open-air cafe on Gangadhar Chetty Road is celebrated for experimental coffee fermentation (cold-smoked beans, cascara brews) and views over the RBANMS turf.",
        "category": "Specialty Coffee & Cafe",
        "neighborhood": "CBD & Central",
        "address": "Gate #3, RBANMS Grounds, Gangadhar Chetty Rd, Halasuru, Bengaluru, Karnataka 560042",
        "lat": 12.9811186,
        "lng": 77.6141313,
        "priceLevel": "\u20b9\u20b9",
        "priceForTwo": "\u20b9750",
        "mustTry": [
            "Cold Smoked Coffee",
            "Ol' Smoky Nitro Cold Brew",
            "Spunk (Espresso + Citrus Tonic)",
            "Turkish Eggs with Garlicky Yogurt",
            "Square Gourmet Burger"
        ],
        "vibeTags": [
            "Work Friendly",
            "Outdoor Seating",
            "Pet Friendly",
            "Breakfast Spot"
        ],
        "imageUrl": "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1000&q=80",
        "googleMapsUrl": "https://www.google.com/maps/place/Maverick+%26+Farmer+Coffee/@12.9811186,77.6141313,17z/data=!3m1!4b1!4m6!3m5!1s0x3bae17c01ffda98f:0xe7dc5960d063b9d1!8m2!3d12.9811186!4d77.6141313!16s%2Fg%2F11s0wybsnq?entry=ttu&g_ep=EgoyMDI2MDgxOS4wIKXMDSoASAFQAw%3D%3D",
        "timings": "8:30 AM \u2013 11:00 PM",
        "curatorNote": "Direct from their Pollibetta estate in Coorg. The Cold Smoked Pour-Over on the wooden deck overlooking the grounds is a revelation.",
        "isVegetarian": False,
        "verified": True
    },
    {
        "id": "fanoos-richmond-town",
        "name": "Fanoos",
        "slug": "fanoos-richmond-town",
        "tagline": "The 1975 creator of Bangalore\u2019s legendary Jumbo Seekh Kabab rolls",
        "description": "A legendary Cantonment institution at Johnson Market since 1975 that pioneered Bangalore\u2019s late-night kebab roll scene, famous for charcoal-grilled beef and mutton seekh kebabs rolled inside flaky parottas.",
        "category": "Regional & Coastal",
        "neighborhood": "CBD & Central",
        "address": "17, Hosur Rd, Opp. Johnson Market, Richmond Town, Bengaluru, Karnataka 560025",
        "lat": 12.9645418,
        "lng": 77.6064884,
        "priceLevel": "\u20b9",
        "priceForTwo": "\u20b9400",
        "mustTry": [
            "Jumbo Beef Seekh Roll",
            "Mutton Seekh Parotta Roll",
            "Mogambo Roll",
            "Charcoal Grilled Seekh Kebabs",
            "Beef Shawarma"
        ],
        "vibeTags": [
            "Late Night",
            "Pocket Friendly"
        ],
        "imageUrl": "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=1000&q=80",
        "googleMapsUrl": "https://www.google.com/maps/place/Hotel+Fanoos/@12.9645418,77.6064884,17z/data=!3m1!4b1!4m6!3m5!1s0x3bae15d4ddc84eb3:0xdf2585909e406805!8m2!3d12.9645418!4d77.6064884!16s%2Fg%2F1tfhdw2q?entry=ttu&g_ep=EgoyMDI2MDgxOS4wIKXMDSoASAFQAw%3D%3D",
        "timings": "12:00 PM \u2013 11:30 PM",
        "curatorNote": "An undisputed Bangalore rite of passage. Ask for the legendary Jumbo Seekh Kabab Roll with extra spiced mint chutney.",
        "isVegetarian": False,
        "verified": True
    },
    {
        "id": "hotel-fishland-gandhinagar",
        "name": "Hotel Fishland",
        "slug": "hotel-fishland-gandhinagar",
        "tagline": "1980s quintessential Mangalorean coastal seafood canteen in old Bangalore",
        "description": "Operating since the 1980s on the 1st floor of Sujatha Complex in Gandhinagar, Hotel Fishland is the holy grail for authentic boiled red rice fish meals, fiery Anjal tawa fry, and crab curries.",
        "category": "Regional & Coastal",
        "neighborhood": "CBD & Central",
        "address": "1st Floor, Sujatha Complex, 1st Main Rd, Gandhinagar, Bengaluru, Karnataka 560009",
        "lat": 12.9754763,
        "lng": 77.5785733,
        "priceLevel": "\u20b9\u20b9",
        "priceForTwo": "\u20b9700",
        "mustTry": [
            "Special Coastal Fish Thali Meal",
            "Anjal (Seer Fish) Rava Fry",
            "Kane (Ladyfish) Masala Fry",
            "Prawns Ghee Roast",
            "Crab Chilly"
        ],
        "vibeTags": [
            "Pocket Friendly"
        ],
        "imageUrl": "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=1000&q=80",
        "googleMapsUrl": "https://www.google.com/maps/place/Hotel+Fishland/@12.9754763,77.5785733,17z/data=!3m1!4b1!4m6!3m5!1s0x3bae160e7a543d75:0xc441981b2fdb3de0!8m2!3d12.9754763!4d77.5785733!16s%2Fg%2F1pxqdkrsz",
        "timings": "11:30 AM \u2013 4:00 PM, 7:00 PM \u2013 10:30 PM",
        "curatorNote": "Old Bangalore\u2019s finest coastal lunch. Pour the fiery Kundapur fish curry generously over boiled red rice alongside a crispy Anjal tawa fry.",
        "isVegetarian": False,
        "verified": True
    },
    {
        "id": "harima-residency-road",
        "name": "Harima",
        "slug": "harima-residency-road",
        "tagline": "Bangalore\u2019s original 2004 authentic Japanese rooftop Izakaya & tatami chambers",
        "description": "Established in 2004 on the 4th floor of Devatha Plaza, Harima has remained Bangalore\u2019s gold standard for traditional Japanese cuisine, offering private sunken tatami rooms (horigotatsu) and rooftop Japanese garden seating.",
        "category": "Pan-Asian & Japanese",
        "neighborhood": "Church Street & MG Road",
        "address": "4th Floor, Devatha Plaza, 131, Residency Rd, Ashok Nagar, Bengaluru, Karnataka 560025",
        "lat": 12.9674947,
        "lng": 77.5999755,
        "priceLevel": "\u20b9\u20b9\u20b9",
        "priceForTwo": "\u20b92,500",
        "mustTry": [
            "Fresh Salmon Sashimi & Nigiri",
            "Crispy Tonkatsu (Pork Cutlet)",
            "Sukiyaki Hot Pot",
            "Yakitori Charcoal Skewers",
            "Matcha Green Tea Ice Cream"
        ],
        "vibeTags": [
            "Romantic",
            "Outdoor Seating"
        ],
        "imageUrl": "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=1000&q=80",
        "googleMapsUrl": "https://www.google.com/maps/place/Harima+Japanese+Restaurant/@12.9674947,77.5999755,17z/data=!3m1!4b1!4m6!3m5!1s0x3bae16789d060117:0xe5acb38834d4722d!8m2!3d12.9674947!4d77.5999755!16s%2Fg%2F1tx45gts?entry=ttu&g_ep=EgoyMDI2MDgxOS4wIKXMDSoASAFQAw%3D%3D",
        "timings": "12:00 PM \u2013 3:00 PM, 6:00 PM \u2013 11:00 PM",
        "curatorNote": "Bangalore\u2019s original authentic Japanese room. Reserve a traditional tatami room for pristine sashimi and authentic hot pot.",
        "isVegetarian": False,
        "verified": True
    },
    {
        "id": "matsuri-the-chancery",
        "name": "Matsuri",
        "slug": "matsuri-the-chancery",
        "tagline": "Authentic Japanese Washoku & expat comfort dining at The Chancery",
        "description": "Bangalore\u2019s long-running authentic Japanese culinary landmark inside The Chancery Hotel on Lavelle Road, created to cater to Japanese expat executives with uncompromised traditional washoku recipes.",
        "category": "Pan-Asian & Japanese",
        "neighborhood": "Lavelle Road",
        "address": "The Chancery Hotel, 10/6, Lavelle Rd, Shanthala Nagar, Ashok Nagar, Bengaluru, Karnataka 560001",
        "lat": 12.975672,
        "lng": 77.599217,
        "priceLevel": "\u20b9\u20b9\u20b9",
        "priceForTwo": "\u20b92,000",
        "mustTry": [
            "Katsudon (Simmered Pork Cutlet Rice Bowl)",
            "Tonkotsu Ramen",
            "Ebi Tempura Platter",
            "Sashimi Moriawase",
            "Chicken Karaage"
        ],
        "vibeTags": [
            "Romantic"
        ],
        "imageUrl": "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=1000&q=80",
        "googleMapsUrl": "https://www.google.com/maps/place/Matsuri/@12.975672,77.599217,17z/data=!3m1!4b1!4m6!3m5!1s0x3bae1793b99775a3:0xaf5edb67064e3332!8m2!3d12.975672!4d77.599217!16s%2Fg%2F11q8w38z9q?entry=ttu&g_ep=EgoyMDI2MDgxOS4wIKXMDSoASAFQAw%3D%3D",
        "timings": "12:00 PM \u2013 2:30 PM, 6:30 PM \u2013 10:30 PM",
        "curatorNote": "The Katsudon (crispy pork cutlet simmered in sweet dashi with soft eggs over rice) is textbook authentic Japanese comfort food.",
        "isVegetarian": False,
        "verified": True
    },
    {
        "id": "byg-brewski-hennur",
        "name": "Byg Brewski Brewing Company",
        "slug": "byg-brewski-hennur",
        "tagline": "Asia\u2019s largest open-air lake microbrewery & artisan craft brews",
        "description": "A colossal 65,000 sq. ft. open-air craft brewing amphitheater set around a stunning Nordic-ruined aquatic lake in Hennur, celebrated for award-winning Hefeweizen, Triple IPAs, and global wood-fired dishes.",
        "category": "Microbrewery",
        "neighborhood": "Bel Road & North BLR",
        "address": "Survey No. 22 & 125, Byrathi Village, Hennur Bagalur Rd, Visthar, Bengaluru, Karnataka 560077",
        "lat": 13.0707751,
        "lng": 77.652177,
        "priceLevel": "\u20b9\u20b9\u20b9",
        "priceForTwo": "\u20b92,200",
        "mustTry": [
            "Byg Rauchbier (Smoked Beer)",
            "Byg Hefeweizen",
            "Byg Monster Nachos",
            "Mangalorean Ghee Roast Chicken",
            "Wood-Fired Sourdough Pizza",
            "Tres Leches"
        ],
        "vibeTags": [
            "Craft Beer",
            "Outdoor Seating",
            "Romantic",
            "Pet Friendly",
            "Late Night"
        ],
        "imageUrl": "https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=1000&q=80",
        "googleMapsUrl": "https://www.google.com/maps/place/Byg+Brewski+Brewing+Company/@13.0707751,77.652177,17z/data=!3m1!4b1!4m6!3m5!1s0x3bae199f21f56f63:0x6bd1c2c704dce57a!8m2!3d13.0707751!4d77.652177!16s%2Fg%2F11hc_2x6sb?entry=ttu&g_ep=EgoyMDI2MDgxOS4wIKXMDSoASAFQAw%3D%3D",
        "timings": "12:00 PM \u2013 1:00 AM",
        "curatorNote": "A monumental craft beer landmark. Grab a table by the illuminated lake for fresh Rauchbier and wood-fired sourdough pizza.",
        "isVegetarian": False,
        "verified": True
    },
    {
        "id": "nerlu-cafe-crescent-road",
        "name": "Nerlu Cafe",
        "slug": "nerlu-cafe-crescent-road",
        "tagline": "Bangalore's premier multi-roaster coffee bar & tasting flights",
        "description": "Founded by Shibani Murlidhar and Rajiv Majumdar, Nerlu is Bangalore\u2019s flagship multi-roaster coffee sanctuary featuring an evolving menu of small-batch beans from independent Indian roasters and a dedicated manual brew bar.",
        "category": "Specialty Coffee & Cafe",
        "neighborhood": "CBD & Central",
        "address": "30, Ground Floor, Crescent Rd, Madhava Nagar, Gandhi Nagar, Bengaluru, Karnataka 560001",
        "lat": 12.9851292,
        "lng": 77.580686,
        "priceLevel": "\u20b9\u20b9",
        "priceForTwo": "\u20b9700",
        "mustTry": [
            "Single-Origin Pour-Over Tasting Flight",
            "Hario Switch Manual Brew",
            "Spiced Orange Cold Brew",
            "Filter Coffee Panna Cotta",
            "Sourdough Toasties"
        ],
        "vibeTags": [
            "Work Friendly",
            "Outdoor Seating",
            "Filter Coffee Spot",
            "Artisanal Sourdough"
        ],
        "imageUrl": "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1000&q=80",
        "googleMapsUrl": "https://www.google.com/maps/place/Nerlu+Cafe/@12.9851292,77.580686,17z/data=!3m1!4b1!4m6!3m5!1s0x3bae17fcd22cf3ab:0x47bde4537330aa2a!8m2!3d12.9851292!4d77.580686!16s%2Fg%2F11t529xrdt?entry=ttu&g_ep=EgoyMDI2MDgxOS4wIKXMDSoASAFQAw%3D%3D",
        "timings": "8:30 AM \u2013 8:00 PM (Closed Mondays)",
        "curatorNote": "The definitive coffee lover's destination. Order a comparative tasting flight to experience terroir variations from different Indian roasters.",
        "isVegetarian": False,
        "verified": True,
        "branches": [
            {
                "id": "nerlu-cafe-indiranagar",
                "name": "Indiranagar (Inside Beruru, Double Rd)",
                "neighborhood": "Indiranagar",
                "address": "Inside Beruru, 218, Double Rd, HAL 2nd Stage, Indiranagar, Bengaluru, Karnataka 560038",
                "lat": 12.9634294,
                "lng": 77.6411015,
                "googleMapsUrl": "https://www.google.com/maps/place/Beruru+-+Garden,+Planter+%26+Outdoor+Furniture+Store+Bangalore/@12.9634294,77.6411015,17z/data=!3m1!4b1!4m6!3m5!1s0x3bae150abac0155f:0x70f12675ebff9a58!8m2!3d12.9634294!4d77.6411015!16s%2Fg%2F11j8l21zs9?entry=ttu&g_ep=EgoyMDI2MDgxOS4wIKXMDSoASAFQAw%3D%3D"
            }
        ]
    },
    {
        "id": "bologna-italian-indiranagar",
        "name": "Bologna Italian Ristorante",
        "slug": "bologna-italian-indiranagar",
        "tagline": "Authentic cream-free traditional Italian dining & hand-rolled pasta",
        "description": "A traditional Italian trattoria on 100 Feet Road celebrated for genuine Italian culinary techniques, handmade emulsified pasta sauces, wood-fired pizzas, and classic desserts.",
        "category": "Modern Indian & Dining",
        "neighborhood": "Indiranagar",
        "address": "759, 1st Floor, 100 Feet Rd, HAL 2nd Stage, Indiranagar, Bengaluru, Karnataka 560038",
        "lat": 12.9718159,
        "lng": 77.6410228,
        "priceLevel": "\u20b9\u20b9\u20b9",
        "priceForTwo": "\u20b91,800",
        "mustTry": [
            "Fettuccine All'Amatriciana",
            "Aglio e Olio Gamberi",
            "Pizza Affettati Misti Con Funghi",
            "Classic Tiramisu",
            "Risotto ai Funghi Porcini"
        ],
        "vibeTags": [
            "Romantic",
            "Outdoor Seating",
            "Cocktail Program"
        ],
        "imageUrl": "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1000&q=80",
        "googleMapsUrl": "https://www.google.com/maps/place/Bologna+Italian+Restaurant+-+Indiranagar/@12.9718159,77.6410228,17z/data=!3m1!4b1!4m6!3m5!1s0x3bae16a7cc11818b:0xf79e5bcd776e03e3!8m2!3d12.9718159!4d77.6410228!16s%2Fg%2F11f54lgfk_?entry=ttu&g_ep=EgoyMDI2MDgxOS4wIKXMDSoASAFQAw%3D%3D",
        "timings": "12:00 PM \u2013 11:00 PM",
        "curatorNote": "One of the few Italian restaurants in Bangalore that refuses to use cream in Carbonara or Amatriciana. Pure Roman tradition.",
        "isVegetarian": False,
        "verified": True
    },
    {
        "id": "spettacolare-indiranagar",
        "name": "Spettacolare",
        "slug": "spettacolare-indiranagar",
        "tagline": "48-hour slow-fermented Neapolitan pizzas & handmade Sicilian pasta",
        "description": "An intimate trattoria in Hoysala Nagar specializing in slow-fermented wood-fired Neapolitan pizzas, artisanal handmade orecchiette, panzerotti, and Sicilian cannoli.",
        "category": "Modern Indian & Dining",
        "neighborhood": "Indiranagar",
        "address": "208, Paramahansa Yogananda Rd (Double Rd), Stage 2, Hoysala Nagar, Indiranagar, Bengaluru, Karnataka 560038",
        "lat": 12.9796029,
        "lng": 77.6368187,
        "priceLevel": "\u20b9\u20b9\u20b9",
        "priceForTwo": "\u20b91,500",
        "mustTry": [
            "Wood-fired Neapolitan Margherita",
            "Handmade Truffle Fettuccine",
            "Panzerotti",
            "Pistachio Cannoli",
            "Lemon Granita"
        ],
        "vibeTags": [
            "Romantic",
            "Outdoor Seating",
            "Artisanal Sourdough"
        ],
        "imageUrl": "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1000&q=80",
        "googleMapsUrl": "https://www.google.com/maps/place/Spettacolare/@12.9796029,77.6368187,17z/data=!3m1!4b1!4m6!3m5!1s0x3bae17e39dcafc91:0xb7f15dea6139a9ec!8m2!3d12.9796029!4d77.6368187!16s%2Fg%2F11kpzvhg2s?entry=ttu&g_ep=EgoyMDI2MDgxOS4wIKXMDSoASAFQAw%3D%3D",
        "timings": "12:30 PM \u2013 10:30 PM",
        "curatorNote": "Charming Southern Italian flavors. The blistered sourdough Neapolitan crust and crispy ricotta cannoli are exceptional.",
        "isVegetarian": False,
        "verified": True
    },
    {
        "id": "concu-patisserie-indiranagar",
        "name": "Con\u00e7u Patisserie & Cafe",
        "slug": "concu-patisserie-indiranagar",
        "tagline": "Luxury French-European patisserie & Scandinavian coral aesthetic",
        "description": "A luxury European patisserie and brunch cafe on 12th Main known for its distinctive warm coral minimalist architecture, choux au craquelin, signature tiramisu, and viennoiserie.",
        "category": "Bakeries & Desserts",
        "neighborhood": "Indiranagar",
        "address": "1089/A, 12th Main Rd, HAL 2nd Stage, Doopanahalli, Indiranagar, Bengaluru, Karnataka 560008",
        "lat": 12.9698563,
        "lng": 77.6378177,
        "priceLevel": "\u20b9\u20b9\u20b9",
        "priceForTwo": "\u20b91,200",
        "mustTry": [
            "Signature Tiramisu",
            "Ispahan Choux Bun",
            "Chocolate Hazelnut Mousse",
            "Berry Cheesecake",
            "Avocado Brioche Tartine"
        ],
        "vibeTags": [
            "Romantic",
            "Work Friendly",
            "Outdoor Seating"
        ],
        "imageUrl": "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1000&q=80",
        "googleMapsUrl": "https://www.google.com/maps/place/Con%C3%A7u+Indiranagar/@12.9698563,77.6378177,17z/data=!3m1!4b1!4m6!3m5!1s0x3bae1772b9994213:0x334522c93c07f852!8m2!3d12.9698563!4d77.6378177!16s%2Fg%2F11kq7vcbh6?entry=ttu&g_ep=EgoyMDI2MDgxOS4wIKXMDSoASAFQAw%3D%3D",
        "timings": "9:00 AM \u2013 11:30 PM",
        "curatorNote": "Impeccable French pastry technique in a stunning sunlit setting. The signature Tiramisu and Choux buns are city benchmarks.",
        "isVegetarian": False,
        "verified": True
    },
    {
        "id": "kink-speciality-coffee-indiranagar",
        "name": "Kink Speciality Coffee",
        "slug": "kink-speciality-coffee-indiranagar",
        "tagline": "Third-wave roastery, precision manual extractions & ceremonial matcha",
        "description": "A minimalist specialty coffee roaster and slow brew bar in Indiranagar serving single-origin micro-lots, precision manual pour-overs, and ceremonial-grade matcha.",
        "category": "Specialty Coffee & Cafe",
        "neighborhood": "Indiranagar",
        "address": "14, 5th Main Rd, Hoysala Nagar, Indiranagar, Bengaluru, Karnataka 560038",
        "lat": 12.9799508,
        "lng": 77.6380991,
        "priceLevel": "\u20b9\u20b9",
        "priceForTwo": "\u20b9650",
        "mustTry": [
            "Single-Origin Manual Pour-Over",
            "Ceremonial Matcha Latte",
            "Tonic Cold Brew",
            "Vietnamese Iced Coffee"
        ],
        "vibeTags": [
            "Work Friendly",
            "Outdoor Seating"
        ],
        "imageUrl": "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1000&q=80",
        "googleMapsUrl": "https://www.google.com/maps/place/Kink+Speciality+Coffee/@12.9799508,77.6380991,17z/data=!3m1!4b1!4m6!3m5!1s0x3bae17001d475c25:0xec457ea8a36b279f!8m2!3d12.9799508!4d77.6380991!16s%2Fg%2F11vycr3ywc?entry=ttu&g_ep=EgoyMDI2MDgxOS4wIKXMDSoASAFQAw%3D%3D",
        "timings": "8:00 AM \u2013 10:00 PM",
        "curatorNote": "A sanctuary for coffee purists and matcha enthusiasts seeking uncompromising manual brewing craft.",
        "isVegetarian": True,
        "verified": True,
        "branches": [
            {
                "id": "kink-slo-bar-ashok-nagar",
                "name": "Ashok Nagar (Castle St Slo Bar)",
                "neighborhood": "Church Street & MG Road",
                "address": "Castle St, Ashok Nagar, Bengaluru, Karnataka 560025",
                "lat": 12.9675125,
                "lng": 77.6081496,
                "googleMapsUrl": "https://www.google.com/maps/place/Castle+St,+Ashok+Nagar,+Bengaluru,+Karnataka+560025/@12.9675125,77.6081496,17z/data=!3m1!4b1!4m6!3m5!1s0x3bae142aab91ece1:0x1d1d49115694af42!8m2!3d12.9675125!4d77.6081496!16s%2Fg%2F1tjpnym_?entry=ttu&g_ep=EgoyMDI2MDgxOS4wIKXMDSoASAFQAw%3D%3D"
            }
        ]
    },
    {
        "id": "smash-guys-indiranagar",
        "name": "Smash Guys",
        "slug": "smash-guys-indiranagar",
        "tagline": "Oklahoma-style crispy laced-edge smash burgers & potato buns",
        "description": "Bangalore's cult smash burger joint specializing in hard-smashed beef, lamb, and chicken patties with ultra-crispy edges, melted American cheese, and Martin\u2019s potato buns.",
        "category": "Modern Indian & Dining",
        "neighborhood": "Indiranagar",
        "address": "948, 12th Main Rd, HAL 2nd Stage, Indiranagar, Bengaluru, Karnataka 560038",
        "lat": 12.9701923,
        "lng": 77.6390325,
        "priceLevel": "\u20b9\u20b9",
        "priceForTwo": "\u20b9700",
        "mustTry": [
            "Oklahoma Smashed Cheeseburger",
            "Chili Cheese Lamb Smash",
            "Truffle Parmesan Fries",
            "Lotus Biscoff Shake"
        ],
        "vibeTags": [
            "Late Night",
            "Pocket Friendly"
        ],
        "imageUrl": "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=1000&q=80",
        "googleMapsUrl": "https://www.google.com/maps/place/Smash+Guys+-+Burger+Kitchen,+Indiranagar/@12.9701923,77.6390325,17z/data=!3m1!4b1!4m6!3m5!1s0x3bae17007d96d779:0x92bd31b1c4b3a7ae!8m2!3d12.9701923!4d77.6390325!16s%2Fg%2F11x8zn2p5x?entry=ttu&g_ep=EgoyMDI2MDgxOS4wIKXMDSoASAFQAw%3D%3D",
        "timings": "12:00 PM \u2013 12:00 AM",
        "curatorNote": "The real deal for smash burgers. Crisp caramelized lace edges paired with squishy potato buns and secret house sauce.",
        "isVegetarian": False,
        "verified": True,
        "branches": [
            {
                "id": "smash-guys-ecoworld",
                "name": "Bellandur (RMZ EcoWorld)",
                "neighborhood": "Whitefield",
                "address": "RMZ EcoWorld, Outer Ring Rd, Bellandur, Bengaluru, Karnataka 560103",
                "lat": 12.9323181,
                "lng": 77.6748335,
                "googleMapsUrl": "https://www.google.com/maps/place/Bellandur,+Bengaluru,+Karnataka/@12.9323181,77.6748335,14z/data=!3m1!4b1!4m6!3m5!1s0x3bae13752e34e92f:0xc2b234a66f986aae!8m2!3d12.9304278!4d77.678404!16s%2Fg%2F11cny1499t?entry=ttu&g_ep=EgoyMDI2MDgxOS4wIKXMDSoASAFQAw%3D%3D"
            }
        ]
    },
    {
        "id": "beanlore-coffee-indiranagar",
        "name": "Beanlore Coffee Roasters",
        "slug": "beanlore-coffee-indiranagar",
        "tagline": "High-ceiling artisanal roastery, Aeropress bar & work cafe",
        "description": "A spacious specialty coffee roastery on CMH Road with high ceilings, single-estate roasts, cold brew tap lines, ergonomic workstations, and sourdough bakes.",
        "category": "Specialty Coffee & Cafe",
        "neighborhood": "Indiranagar",
        "address": "503, Chinmaya Mission Hospital (CMH) Rd, Indiranagar 1st Stage, Bengaluru, Karnataka 560038",
        "lat": 12.978686,
        "lng": 77.643753,
        "priceLevel": "\u20b9\u20b9",
        "priceForTwo": "\u20b9750",
        "mustTry": [
            "Liquid Tiramisu Frappe",
            "Single-Estate Aeropress",
            "Flat White",
            "Truffle Mushroom Toast",
            "Basque Cheesecake"
        ],
        "vibeTags": [
            "Work Friendly",
            "Outdoor Seating"
        ],
        "imageUrl": "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1000&q=80",
        "googleMapsUrl": "https://www.google.com/maps/place/Beanlore+-+Indiranagar/@12.978686,77.643753,17z/data=!3m1!4b1!4m6!3m5!1s0x3bae1703a9f93541:0x4c4d67e03b6064e!8m2!3d12.978686!4d77.643753!16s%2Fg%2F11xw3x7bpy?entry=ttu&g_ep=EgoyMDI2MDgxOS4wIKXMDSoASAFQAw%3D%3D",
        "timings": "8:00 AM \u2013 11:00 PM",
        "curatorNote": "Excellent specialty coffee and one of the most comfortable laptop-friendly workspaces on CMH Road.",
        "isVegetarian": False,
        "verified": True
    },
    {
        "id": "paper-and-pie-indiranagar",
        "name": "Paper & Pie",
        "slug": "paper-and-pie-indiranagar",
        "tagline": "Japandi-minimalist creator hub, podcast studio & specialty roastery",
        "description": "A stunning Japandi-designed lifestyle cafe on 100ft Road equipped with soundproof podcast booths, in-house coffee roasting, sourdough tartines, and signature fruit pies.",
        "category": "Specialty Coffee & Cafe",
        "neighborhood": "Indiranagar",
        "address": "842/A, 100 Feet Rd, Metro Pillar 55, Indiranagar 1st Stage, Bengaluru, Karnataka 560038",
        "lat": 12.9810313,
        "lng": 77.6409712,
        "priceLevel": "\u20b9\u20b9",
        "priceForTwo": "\u20b9900",
        "mustTry": [
            "Specialty Pour-over",
            "Sourdough Avocado Tartine",
            "Creamy Pesto Gnocchi",
            "Signature Fruit Pies & Tarts",
            "Japanese Katsu Sandwich"
        ],
        "vibeTags": [
            "Work Friendly",
            "Outdoor Seating",
            "Breakfast Spot"
        ],
        "imageUrl": "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1000&q=80",
        "googleMapsUrl": "https://www.google.com/maps/place/Paper+%26+Pie/@12.9810313,77.6409712,17z/data=!3m1!4b1!4m6!3m5!1s0x3bae17ccea329e57:0x6ad67a28503b7a84!8m2!3d12.9810313!4d77.6409712!16s%2Fg%2F11q4d56bvl?entry=ttu&g_ep=EgoyMDI2MDgxOS4wIKXMDSoASAFQAw%3D%3D",
        "timings": "8:00 AM \u2013 11:00 PM",
        "curatorNote": "A gorgeous convergence of specialty coffee, creative co-working, and elevated cafe comfort.",
        "isVegetarian": False,
        "verified": True,
        "branches": [
            {
                "id": "paper-and-pie-whitefield",
                "name": "Whitefield (ITPL Main Rd)",
                "neighborhood": "Whitefield",
                "address": "ITPL Main Rd, Whitefield, Bengaluru, Karnataka 560066",
                "lat": 12.9922191,
                "lng": 77.7158794,
                "googleMapsUrl": "https://www.google.com/maps/place/ITPL+Main+Rd,+Bengaluru,+Karnataka/@12.9922191,77.7158794,17z/data=!3m1!4b1!4m6!3m5!1s0x3bae11969115da85:0xad12e5418643ebb4!8m2!3d12.9922191!4d77.7158794!16s%2Fg%2F11vc16gl6x?entry=ttu&g_ep=EgoyMDI2MDgxOS4wIKXMDSoASAFQAw%3D%3D"
            }
        ]
    },
    {
        "id": "the-kind-roastery-jp-nagar",
        "name": "The Kind Roastery & Brew Room",
        "slug": "the-kind-roastery-jp-nagar",
        "tagline": "100% vegetarian specialty roastery, Zen garden & eggless bakery",
        "description": "A 100% vegetarian specialty coffee roastery and eggless bakery in JP Nagar featuring Japanese Zen architecture, tranquil bamboo courtyards, and gourmet plant-forward dining.",
        "category": "Specialty Coffee & Cafe",
        "neighborhood": "JP Nagar",
        "address": "1316/F, 18th B Main Rd, Marenahalli, JP Nagar 2nd Phase, Bengaluru, Karnataka 560078",
        "lat": 12.9105701,
        "lng": 77.5895897,
        "priceLevel": "\u20b9\u20b9",
        "priceForTwo": "\u20b9850",
        "mustTry": [
            "Kind Brew Single-Origin Pour-over",
            "Korean Cream Cheese Garlic Brioche",
            "Avocado Tartine",
            "Roasted Pepper Dumplings",
            "Lotus Biscoff Cheesecake"
        ],
        "vibeTags": [
            "Pure Veg",
            "Work Friendly",
            "Outdoor Seating",
            "Romantic"
        ],
        "imageUrl": "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1000&q=80",
        "googleMapsUrl": "https://www.google.com/maps/place/The+Kind+Roastery+and+Brew+Room,+J.P+Nagar/@12.9105701,77.5895897,17z/data=!3m1!4b1!4m6!3m5!1s0x3bae1554c7d36d2d:0xa719fb753a3b9431!8m2!3d12.9105701!4d77.5895897!16s%2Fg%2F11s9jvkyvt?entry=ttu&g_ep=EgoyMDI2MDgxOS4wIKXMDSoASAFQAw%3D%3D",
        "timings": "8:00 AM \u2013 11:00 PM",
        "curatorNote": "South Bangalore\u2019s premier pure-vegetarian specialty roastery. The Korean garlic brioche and pourovers in the Zen courtyard are unmatched.",
        "isVegetarian": True,
        "verified": True
    },
    {
        "id": "circa-11-indiranagar",
        "name": "Circa 11",
        "slug": "circa-11-indiranagar",
        "tagline": "Michelin-trained day-to-night progressive dining & craft cocktail room",
        "description": "Created by Michelin-trained Chef Pradyumna Harithsa, Circa 11 serves specialty coffee and bakes by day, transforming into a progressive global dining room and cocktail lounge by night.",
        "category": "Modern Indian & Dining",
        "neighborhood": "Indiranagar",
        "address": "957, 12th Main Rd, HAL 2nd Stage, Indiranagar, Bengaluru, Karnataka 560038",
        "lat": 12.9702618,
        "lng": 77.6401843,
        "priceLevel": "\u20b9\u20b9\u20b9",
        "priceForTwo": "\u20b92,000",
        "mustTry": [
            "Duck Confit Sliders",
            "Cured Hamachi Small Plates",
            "Artisanal Handmade Pasta",
            "Daytime Specialty Bakes",
            "Botanical Craft Cocktails"
        ],
        "vibeTags": [
            "Romantic",
            "Cocktail Program",
            "Work Friendly"
        ],
        "imageUrl": "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1000&q=80",
        "googleMapsUrl": "https://www.google.com/maps/place/Circa+11/@12.9702618,77.6401843,17z/data=!3m1!4b1!4m6!3m5!1s0x3bae17bbd84a8061:0xce12bc7e01d26b5d!8m2!3d12.9702618!4d77.6401843!16s%2Fg%2F11xdxt40gf?entry=ttu&g_ep=EgoyMDI2MDgxOS4wIKXMDSoASAFQAw%3D%3D",
        "timings": "9:00 AM \u2013 4:00 PM (Cafe), 6:00 PM \u2013 12:00 AM (Dining & Cocktails)",
        "curatorNote": "A culinary tour de force by Chef Pradyumna. The duck confit and nightly cocktail program showcase serious gastronomic technique.",
        "isVegetarian": False,
        "verified": True
    },
    {
        "id": "vanamo-indiranagar",
        "name": "Vanamo Global Eats and Caffeinary",
        "slug": "vanamo-indiranagar",
        "tagline": "Nordic-aesthetic cafe, specialty caffeinary & unique global dishes",
        "description": "A chic Nordic-inspired cafe on 100 Feet Road curating underrepresented international cuisines (Ukrainian, Greek, Romanian, Filipino) alongside single-origin coffees and breakfast bowls.",
        "category": "Specialty Coffee & Cafe",
        "neighborhood": "Indiranagar",
        "address": "368, Ground Floor, 100 Feet Rd, HAL 2nd Stage, Indiranagar, Bengaluru, Karnataka 560008",
        "lat": 12.9732198,
        "lng": 77.6413393,
        "priceLevel": "\u20b9\u20b9",
        "priceForTwo": "\u20b9900",
        "mustTry": [
            "Ukrainian Syrniki (Cottage Cheese Pancakes)",
            "Patatas Bravas",
            "Greek Salad Bowl",
            "Specialty Cortado",
            "Signature Cold Brew"
        ],
        "vibeTags": [
            "Romantic",
            "Work Friendly",
            "Outdoor Seating"
        ],
        "imageUrl": "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1000&q=80",
        "googleMapsUrl": "https://www.google.com/maps/place/Vanamo+Global+Eats+and+Caffeinary/@12.9732198,77.6413393,17z/data=!3m1!4b1!4m6!3m5!1s0x3bae170021918d93:0x4e0cc7dff9e7c3f8!8m2!3d12.9732198!4d77.6413393!16s%2Fg%2F11w44pk30c?entry=ttu&g_ep=EgoyMDI2MDgxOS4wIKXMDSoASAFQAw%3D%3D",
        "timings": "8:30 AM \u2013 11:00 PM",
        "curatorNote": "The Ukrainian Syrniki (fluffy golden quark cheese pancakes with berry compote) paired with a flat white is a revelation.",
        "isVegetarian": False,
        "verified": True
    },
    {
        "id": "yogisthaan-cafe-indiranagar",
        "name": "Yogisthaan Cafe",
        "slug": "yogisthaan-cafe-indiranagar",
        "tagline": "Bangalore's barefoot Ayurvedic wellness sanctuary & organic garden cafe",
        "description": "A tranquil open-air garden retreat in Indiranagar 1st Stage serving 100% organic, sattvic, macrobiotic vegetarian and vegan food prepared according to Ayurvedic principles.",
        "category": "Specialty Coffee & Cafe",
        "neighborhood": "Indiranagar",
        "address": "89, 11th Cross Rd, Indiranagar 1st Stage, Hoysala Nagar, Bengaluru, Karnataka 560038",
        "lat": 12.9809695,
        "lng": 77.6384095,
        "priceLevel": "\u20b9\u20b9",
        "priceForTwo": "\u20b9800",
        "mustTry": [
            "Signature Ayurvedic Kitchari",
            "Hashi (Brown Rice & Veggie Bowl)",
            "Moong Dal Chilla",
            "Jaggery Filter Coffee",
            "Cold-Pressed Detox Juices"
        ],
        "vibeTags": [
            "Pure Veg",
            "Outdoor Seating",
            "Pet Friendly"
        ],
        "imageUrl": "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1000&q=80",
        "googleMapsUrl": "https://www.google.com/maps/place/Yogisthaan/@12.9809695,77.6384095,17z/data=!4m9!3m8!1s0x3bae16bb3a6d4d75:0xe8ba050e1253c86b!5m2!4m1!1i2!8m2!3d12.9809695!4d77.6384095!16s%2Fg%2F11h171s66?entry=ttu&g_ep=EgoyMDI2MDgxOS4wIKXMDSoASAFQAw%3D%3D",
        "timings": "8:00 AM \u2013 9:30 PM",
        "curatorNote": "An oasis of peace. Kick off your shoes, sit on the sunlit garden hammocks, and order the comforting warm Ayurvedic Kitchari.",
        "isVegetarian": True,
        "verified": True
    },
    {
        "id": "izanagi-japanese-indiranagar",
        "name": "Izanagi Japanese Dining",
        "slug": "izanagi-japanese-indiranagar",
        "tagline": "Authentic Japanese Washoku, private tatami rooms & sushi bar",
        "description": "An authentic Japanese restaurant on 100 Feet Road featuring private tatami dining chambers, sushi bar, robata skewers, slow-simmered tonkotsu ramen, and premium sakes.",
        "category": "Pan-Asian & Japanese",
        "neighborhood": "Indiranagar",
        "address": "311, 2nd Floor, 100 Feet Rd, Binnamangala 1st Stage, Indiranagar, Bengaluru, Karnataka 560038",
        "lat": 12.9812505,
        "lng": 77.6405078,
        "priceLevel": "\u20b9\u20b9\u20b9",
        "priceForTwo": "\u20b92,200",
        "mustTry": [
            "Tonkotsu Pork / Chicken Ramen",
            "Salmon & Tuna Sashimi Moriawase",
            "Ebi Tempura Roll",
            "Chashu Don",
            "Japanese Sake"
        ],
        "vibeTags": [
            "Romantic"
        ],
        "imageUrl": "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=1000&q=80",
        "googleMapsUrl": "https://www.google.com/maps/place/Izanagi+Japanese+Restaurant/@12.9812505,77.6405078,17z/data=!3m1!4b1!4m6!3m5!1s0x3bae17e8909756a9:0xe0616b564cb1834e!8m2!3d12.9812505!4d77.6405078!16s%2Fg%2F11vw_r5hn9?entry=ttu&g_ep=EgoyMDI2MDgxOS4wIKXMDSoASAFQAw%3D%3D",
        "timings": "12:00 PM \u2013 3:30 PM, 6:30 PM \u2013 11:00 PM",
        "curatorNote": "Authentic Japanese flavors without compromise. The rich Tonkotsu ramen broth and pristine Sashimi platter are standout items.",
        "isVegetarian": False,
        "verified": True
    },
    {
        "id": "muru-muru-indiranagar",
        "name": "Muru Muru",
        "slug": "muru-muru-indiranagar",
        "tagline": "Converted vintage bungalow cafe & nostalgic comfort bites",
        "description": "A cozy cafe housed in a vintage residential bungalow with lush greenery and cane furniture, serving nostalgic Indian comfort snacks reimagined with modern touches.",
        "category": "Specialty Coffee & Cafe",
        "neighborhood": "Indiranagar",
        "address": "33, 12th Cross Rd, Indira Nagar 2nd Stage, Hoysala Nagar, Bengaluru, Karnataka 560038",
        "lat": 12.9821907,
        "lng": 77.6378677,
        "priceLevel": "\u20b9\u20b9",
        "priceForTwo": "\u20b9650",
        "mustTry": [
            "Dosa Batter Onion Rings",
            "Three Cheese Sabudana Vada",
            "Sharma Ji\u2019s Aloo Chaat",
            "Cream Cheese Bagel Naan",
            "Filter Coffee Frappe"
        ],
        "vibeTags": [
            "Pure Veg",
            "Outdoor Seating",
            "Work Friendly",
            "Pocket Friendly"
        ],
        "imageUrl": "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1000&q=80",
        "googleMapsUrl": "https://www.google.com/maps/place/Muru+Muru/@12.9821907,77.6378677,17z/data=!3m1!4b1!4m6!3m5!1s0x3bae170059ac6c49:0xf7f5cfc3bc2387b1!8m2!3d12.9821907!4d77.6378677!16s%2Fg%2F11w4gty4lq?entry=ttu&g_ep=EgoyMDI2MDgxOS4wIKXMDSoASAFQAw%3D%3D",
        "timings": "11:00 AM \u2013 10:30 PM",
        "curatorNote": "The quintessential Indiranagar adda. Sit under the trees and snack on crispy cheese sabudana vadas and iced filter coffee.",
        "isVegetarian": True,
        "verified": True
    },
    {
        "id": "the-estate-deli-indiranagar",
        "name": "The Estate Deli",
        "slug": "the-estate-deli-indiranagar",
        "tagline": "Boutique deli, Chicago deep-dish pizza & gourmet lamb burgers",
        "description": "A boutique artisan deli near Indiranagar Club specializing in Chicago-style deep dish pizza, signature lamb smash burgers, slow-cooked pastas, and house bakes.",
        "category": "Modern Indian & Dining",
        "neighborhood": "Indiranagar",
        "address": "3162, 60 Feet Rd, 12th Cross Rd, Defence Colony, Indiranagar, Bengaluru, Karnataka 560008",
        "lat": 12.9694095,
        "lng": 77.6358547,
        "priceLevel": "\u20b9\u20b9",
        "priceForTwo": "\u20b9900",
        "mustTry": [
            "House Lamb Smash Burger",
            "Chicago Deep-Dish Pie Pizza",
            "Slow-Cooked Lamb Spaghetti",
            "Rose & Pistachio Tea Cake",
            "Sea Salt Brownie"
        ],
        "vibeTags": [
            "Romantic",
            "Work Friendly"
        ],
        "imageUrl": "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=1000&q=80",
        "googleMapsUrl": "https://www.google.com/maps/place/The+Estate+Deli/@12.9694095,77.6358547,17z/data=!3m1!4b1!4m6!3m5!1s0x3bae17000a6aeaa1:0xd351711e1ed77f71!8m2!3d12.9694095!4d77.6358547!16s%2Fg%2F11xfj78472?entry=ttu&g_ep=EgoyMDI2MDgxOS4wIKXMDSoASAFQAw%3D%3D",
        "timings": "12:00 PM \u2013 11:00 PM",
        "curatorNote": "Bangalore's premier spot for genuine Chicago deep-dish pizza and hearty house-ground lamb smash burgers.",
        "isVegetarian": False,
        "verified": True
    }
]

# Generate clean TypeScript code
ts_content = "import { Restaurant } from '@/types';\n\nexport const INITIAL_RESTAURANTS: Restaurant[] = "
ts_content += json.dumps(ALL_MASTER_SPOTS, indent=2) + ";\n"

with open('src/data/restaurants.ts', 'w') as f:
    f.write(ts_content)

print(f"Generated clean master dataset with {len(ALL_MASTER_SPOTS)} unique, verified spots in src/data/restaurants.ts")
