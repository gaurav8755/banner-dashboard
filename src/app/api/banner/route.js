import mysql from 'mysql2/promise';

// SQL to create the banner table if it doesn't exist
const createTableSQL = `
CREATE TABLE IF NOT EXISTS banner (
    id INT AUTO_INCREMENT PRIMARY KEY,
    description VARCHAR(255) NOT NULL,
    timer INT NOT NULL,
    link VARCHAR(255) NOT NULL,
    is_visible BOOLEAN NOT NULL
);
`;

// SQL to insert default data if the table is empty
const insertDefaultDataSQL = `
INSERT INTO banner (description, timer, link, is_visible)
SELECT 'Welcome to our site!', 60, 'https://example.com', TRUE
WHERE NOT EXISTS (SELECT 1 FROM banner);
`;

export async function GET() {
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    });

    try {
        // Create table if it does not exist
        await connection.execute(createTableSQL);

        // Insert default data if the table is empty
        await connection.execute(insertDefaultDataSQL);

        // Fetch the banner data
        const [rows] = await connection.execute('SELECT * FROM banner WHERE id = 1');
        
        if (rows.length > 0) {
            return new Response(JSON.stringify(rows[0]), { status: 200 });
        } else {
            return new Response(JSON.stringify({ message: 'Banner not found' }), { status: 404 });
        }
    } catch (error) {
        console.error('Database query error:', error);
        return new Response(JSON.stringify({ message: 'Internal Server Error' }), { status: 500 });
    } finally {
        connection.end();
    }
}
