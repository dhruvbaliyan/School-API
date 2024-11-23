const db = require('../db.js');


function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radius of the Earth in km
    const dLat = (lat2 - lat1) * (Math.PI / 180); 
    const dLon = (lon2 - lon1) * (Math.PI / 180);

    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * 
              Math.sin(dLon / 2) * Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in km
    return distance;
}

exports.addSchool = async (req, res) => {
    const { name, address, latitude, longitude } = req.body;

    
    console.log('Received data: ', req.body);

    // Validate the incoming data
    if (!name || !address || !latitude || !longitude) {
        return res.status(400).json({
            msg: "All fields are required."
        });
    }

    const query = 'INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)';

    try {
        // Execute query with async/await
        const [result] = await db.query(query, [name, address, latitude, longitude]);

        console.log("Query result: ", result);  // Log the result of the query

        // Return the success response
        res.status(201).json({
            msg: "School added successfully",
            result
        });
    } catch (err) {
        // Catch any errors and respond with a 500 status code
        console.error("Error executing query: ", err);
        res.status(500).json({
            msg: "Error adding school",
            err
        });
    }
};



exports.listSchools = async (req, res) => {
    const { latitude, longitude } = req.query;

    // Validate latitude and longitude
    if (!latitude || !longitude) {
        return res.status(400).json({
            msg: 'Latitude and longitude are required.'
        });
    }

    const query = 'SELECT id, name, address, latitude, longitude FROM schools';

    try {
        
        const [schools] = await db.query(query);

        const schoolsWithDistance = schools.map(school => {
            const dis = calculateDistance(latitude, longitude, school.latitude, school.longitude);
            return { ...school, distance: dis };
        });

       
        schoolsWithDistance.sort((a, b) => a.distance - b.distance);

        
        res.status(200).json({
            schools: schoolsWithDistance
        });
    } catch (err) {
        // Handle errors if the query fails
        console.error("Error fetching schools: ", err);
        res.status(500).json({
            message: 'Error fetching schools',
            error: err
        });
    }
};
