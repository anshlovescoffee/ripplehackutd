import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

const data = [
    [
        '00000950dea4a869e9fe70d823444d418c5abebbd8e8303306a1cdf1bae0fd6c', 0, 3, 2, 1849821.52, 2229501.06, 2652855.9, 2243758.04, 6606018.04, 2390024.74, -68.3, -67, -65, -75, '500.0M', 'ROMA', 'TX', null, null, null, null, null, null, null, null
    ],
    [
        '00002ec815678c6b9837ad4c9db82ac7fe5fb6af5dc22996b4f84272740c4c4e', 1, 13, 6, 531678.06, 317001.07, 1159275.25, 330959.2, 1947402.28, 377451.72, -50.2, -47, -38, -76, '500.0M', 'CARROLLTON', 'TX', null, null, null, null, null, null, null, null
    ],
    [
        '000050825287b713415614a237757da4cd7517365cbce239ce50ec86d84c934c', 1, 9, 3, 265703.52, 9632.47, 1250416.88, 31802.22, 1880263.44, 68332.66, -55.8, -51, -28, -89, '2000.0M', 'AZLE', 'TX', true, true, null, null, null, null, null, null
    ],
    [
        '000060be4aa292815abc44ab6fe96015b89e83b21c8a63473ee216fd67998a99', 0, 3, 3, 1077447.53, 414961.33, 1576694.57, 423475.07, 1684422.42, 424580.15, -60, -72, -14, -76, '200.0M', 'VALPARAISO', 'IN', null, null, null, null, null, null, null, null
    ],
    [
        '00008c39885815e42a0bb750cee199cd4da741a564570530cc38c3dc040f030c', 1, 19, 7, 608361.35, 478025.87, 1349913.15, 655342.35, 2472541.68, 1111928.54, -57.5, -57, -33 , -86, '1000.0M', 'STRATFORD', 'CT', null, null, null, null, null, null, null, null
    ]
];

async function setupDatabase() {
    // Open the database
    const db = await open({
        filename: 'mydatabase.db',
        driver: sqlite3.Database
    });

    // Drop the tables if they exist
    await db.exec(`DROP TABLE IF EXISTS NetworkStats;`);
    await db.exec(`DROP TABLE IF EXISTS users;`);

    // Create the NetworkStats table with the appropriate columns
    await db.exec(`CREATE TABLE NetworkStats (
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
        whole_home_wifi BOOLEAN,
        wifi_security BOOLEAN,
        wifi_security_plus BOOLEAN,
        premium_tech_pro BOOLEAN,
        identity_protection BOOLEAN,
        family_identity_protection BOOLEAN,
        total_shield BOOLEAN,
        youtube_tv BOOLEAN
    );`);

    // Insert the data into the NetworkStats table
    const insertQuery = `INSERT INTO NetworkStats (
        acct_id, extenders, wireless_clients_count, wired_clients_count, rx_avg_bps, tx_avg_bps, rx_p95_bps, tx_p95_bps, rx_max_bps, tx_max_bps, rssi_mean, rssi_median, rssi_max, rssi_min, network_speed, city, state, whole_home_wifi, wifi_security, wifi_security_plus, premium_tech_pro, identity_protection, family_identity_protection, total_shield, youtube_tv
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    for (const row of data) {
        await db.run(insertQuery, row);
    }

    // Create the users table
    await db.exec(`CREATE TABLE users (
        acct_id TEXT PRIMARY KEY,
        username TEXT NOT NULL,
        password TEXT NOT NULL DEFAULT 'password',
        FOREIGN KEY (acct_id) REFERENCES NetworkStats(acct_id)
    );`);

    // Insert user data into the users table
    const userData = [
        ['00000950dea4a869e9fe70d823444d418c5abebbd8e8303306a1cdf1bae0fd6c', 'user_00000950dea4a869e9fe70d823444d418c5abebbd8e8303306a1cdf1bae0fd6c', 'password'],
        ['00002ec815678c6b9837ad4c9db82ac7fe5fb6af5dc22996b4f84272740c4c4e', 'user_00002ec815678c6b9837ad4c9db82ac7fe5fb6af5dc22996b4f84272740c4c4e', 'password'],
        ['000050825287b713415614a237757da4cd7517365cbce239ce50ec86d84c934c', 'user_000050825287b713415614a237757da4cd7517365cbce239ce50ec86d84c934c', 'password'],
        ['000060be4aa292815abc44ab6fe96015b89e83b21c8a63473ee216fd67998a99', 'user_000060be4aa292815abc44ab6fe96015b89e83b21c8a63473ee216fd67998a99', 'password'],
        ['00008c39885815e42a0bb750cee199cd4da741a564570530cc38c3dc040f030c', 'user_00008c39885815e42a0bb750cee199cd4da741a564570530cc38c3dc040f030c', 'password']
    ];

    const userInsertQuery = `INSERT INTO users (acct_id, username, password) VALUES (?, ?, ?)`;

    for (const user of userData) {
        await db.run(userInsertQuery, user);
    }

    console.log('Users table created and default data inserted.');

    // Close the database connection
    await db.close();
}

// Execute the setup function
setupDatabase().catch(console.error);