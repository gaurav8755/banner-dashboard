import mysql from 'mysql2/promise';

export async function POST(req) {
    const { description, timer, link, isVisible } = await req.json();

    const connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    });

    try {
        const updateSQL = `
        INSERT INTO banner (id, description, timer, link, is_visible)
        VALUES (1, ?, ?, ?, ?)
        ON DUPLICATE KEY UPDATE
        description = VALUES(description),
        timer = VALUES(timer),
        link = VALUES(link),
        is_visible = VALUES(is_visible);
        `;

        await connection.execute(updateSQL, [description, timer, link, isVisible]);

        return new Response(JSON.stringify({ message: 'Banner updated successfully!' }), { status: 200 });
    } catch (error) {
        console.error('Database query error:', error);
        return new Response(JSON.stringify({ message: 'Internal Server Error' }), { status: 500 });
    } finally {
        connection.end();
    }
}
