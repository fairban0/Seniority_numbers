import 'dotenv/config';
import postgres from 'postgres';

const sql = postgres(process.env.DATABASE_URL, {
    ssl: 'require'
});

const createSeniorityTable = async () => {
    await sql`
        CREATE TABLE IF NOT EXISTS seniority_numbers (
            id INTEGER PRIMARY KEY,
            seniority_number INTEGER NOT NULL
        )
    `;
};

const seniorityNumberUpdate = async () => {
    try {
        // Create table first
        await createSeniorityTable();
        
        // Clear existing data if any
        await sql`TRUNCATE TABLE seniority_numbers`;
        
        // Generate values for bulk insert
        const values = [];
        
        for (let id = 1, seniorityNum = 1; id <= 1000; id += 2, seniorityNum += 3) {
            values.push({
                id: id,
                seniority_number: seniorityNum
            });
        }
        
        // Bulk insert all values
        await sql`
            INSERT INTO seniority_numbers ${
                sql(values, 'id', 'seniority_number')
            }
        `;
        
        console.log('Seniority numbers updated successfully');
    } catch (error) {
        console.error('Error updating seniority numbers:', error);
        throw error;
    }
};

// Execute the function
seniorityNumberUpdate()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });