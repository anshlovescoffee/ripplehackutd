import sqlite3

# Connect to SQLite database (or create it if it doesn't exist)
conn = sqlite3.connect('network_data.db')

# Create a cursor object
cursor = conn.cursor()

# Create a table with the specified columns
cursor.execute('''
CREATE TABLE IF NOT EXISTS NetworkStats (
    acct_id TEXT PRIMARY KEY,
    extenders INTEGER,
    wireless_clients_count INTEGER,
    wired_clients_count INTEGER,
    rx_avg_bps REAL,
    tx_avg_bps REAL,
    rx_p95_bps REAL,
    tx_p95_bps REAL,
    rx_max_bps REAL,
    tx_max_bps REAL,
    rssi_mean REAL,
    rssi_median REAL,
    rssi_max REAL,
    rssi_min REAL,
    network_speed TEXT,
    city TEXT,
    state TEXT,
    whole_home_wifi TEXT,
    wifi_security TEXT,
    wifi_security_plus TEXT,
    premium_tech_pro TEXT,
    identity_pro TEXT,
    family_identity_protection TEXT,
    total_shield TEXT,
    youtube_tv TEXT
);
''')

# Data to be inserted
data = [
    ('00000950dea4a869e9fe70d823444d418c5abebbd8e8303306a1cdf1bae0fd6c', 0, 3, 2, 1849821.52, 2229501.06, 2652855.9, 2243758.04, 6606018.04, 2390024.74, -68.3, -67, -65, -75, '500.0M', 'ROMA', 'TX', None, None, None, None, None, None, None, None),
    ('00002ec815678c6b9837ad4c9db82ac7fe5fb6af5dc22996b4f84272740c4c4e', 1, 13, 6, 531678.0631578946, 317001.0684210526, 1159275.2473684212, 330959.2, 1947402.2789473687, 377451.72105263156, -50.2, -47, -38, -76, '500.0M', 'CARROLLTON', 'TX', None, None, None, None, None, None),
    ('000050825287b713415614a237757da4cd7517365cbce239ce50ec86d84c934c', 1, 9, 3, 265703.525, 9632.466666666667, 1250416.875, 31802.216666666664, 1880263.4416666667, 68332.65833333334, -55.8, -51, -28, -89, '2000.0M', 'AZLE', 'TX', 'TRUE', 'TRUE', None, None, None, None, None, None),
    ('000060be4aa292815abc44ab6fe96015b89e83b21c8a63473ee216fd67998a99', 0, 3, 3, 1077447.5333333332, 414961.3333333333, 1576694.5666666667, 423475.0666666667, 1684422.4166666667, 424580.15, -60, -72, -14, -76, '200.0M', 'VALPARAISO', 'IN', None, None, None, None, None, None),
    ('00008c39885815e42a0bb750cee199cd4da741a564570530cc38c3dc040f030c', 1, 19, 7, 608361.3462, 478025.8692307693, 1349913.1538461535, 655342.3538461538, 2472541.676923077, 1111928.5384615385, -57.5, -57, -33, -86, '1000.0M', 'STRATFORD', 'CT', None, None, None, None, None, None),
    ('00009d9898eab1ea1d3669cd11ac257ccd98e1bc007e69d47f33a0f952293026', 0, 14, 7, 120511.17142857146, 26147.014285714282,  818567.1238095239, 208691.82380952383, 1801620.3476190474, 447748.10952380946, -63.1, -63, -43, -90, '500.0M', 'PLAIN CITY', 'OH', None, None, None, None, None, None),
    ('0000c415de5ceea33c02daa85a1c218ecca1b1c9e9864ed34d183597844de8e2', 0, 5, 1, 139912.05, 10749.383333333335, 1137377.0166666666, 58433.26666666667, 2982684.9666666663, 328552.06666666665, -52.8, -51, -28, -71, '500.0M', 'VERNON ROCKVILLE', 'CT', None, None, None, None, None, None),
    ('0000df7211c711bf7bcf9ce4c98d92707de7ffde94efd38b2502a9ed2a8323a2', 4, 8, 7, 367778.06666666665, 401091.27999999997, 1156184.16, 438185.61999999994, 2128055.9799999995, 491691.8466666666, -56.9, -57, -31, -76, '500.0M', 'DOVER', 'OH', 'TRUE', None, None, None, None, None, None),
    ('00010928ff5a664fdb4db0d2fa5d87bbab31f369123367310240b008bcff13a5', 0, 6, 2, 492651.1875, 753529.8625, 489972.78750000003, 753595.425, 888987.25, 755823.5249999999, -37.4, -38, -23, -47, '500.0M', 'TAMPA', 'FL', None, None, None, None, None, None),
    ('00010b900c4231f17a763e83a25471dc81ce6a92d12f567a74a957657531ef97', 0, 10, 2, 484189.3666666667, 31065.775000000005, 1623703.8250000002, 91428.96666666667, 4367182.108333333, 1124266.875, -64.8, -68, -29, -87, '1000.0M', 'LAND O LAKES', 'FL', None, 'TRUE', None, None, None, None),
    ('00012039856596ddf591abbc50c803b89d0207cbe72ad65634536a68e66823fe', 3, 20, 8, 246134.40357142853, 12494.02857142857, 1441141.3499999999, 37803.121428571416, 2355003.95, 527846.5857142858, -62.2, -62, -48, -80, '1000.0M', 'AVON', 'CT', None, None, None, None, None, None)
]

# Insert data into the table
cursor.executemany('''
INSERT INTO NetworkStats (acct_id, extenders, wireless_clients_count, wired_clients_count, 
    rx_avg_bps, tx_avg_bps, rx_p95_bps, tx_p95_bps, rx_max_bps, tx_max_bps, 
    rssi_mean, rssi_median, rssi_max, rssi_min, network_speed, city, state, 
    whole_home_wifi, wifi_security, wifi_security_plus, premium_tech_pro, 
    identity_pro, family_identity_protection, total_shield, youtube_tv)
VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
''', data)

# Commit the changes and close the connection
conn.commit()
conn.close()

print("Database created and populated successfully.")