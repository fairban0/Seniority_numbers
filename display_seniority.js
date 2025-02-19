import 'dotenv/config';
import postgres from 'postgres';

const sql = postgres(process.env.DATABASE_URL, {
    ssl: 'require'
});

const displaySeniorityNumbers = async () => {
    try {
        const results = await sql`
            SELECT * FROM seniority_numbers
            ORDER BY id ASC
        `;

        console.log('\nSeniority Numbers:');
        console.log('ID | Seniority Number');
        console.log('-------------------');
        
        results.forEach(row => {
            console.log(`${row.id.toString().padStart(2)} | ${row.seniority_number}`);
        });

        console.log(`\nTotal records: ${results.length}`);
    } catch (error) {
        console.error('Error retrieving seniority numbers:', error);
    } finally {
        await sql.end();
    }
};

// Execute the function
displaySeniorityNumbers(); 