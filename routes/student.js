const express = require('express');
const { poolPromise ,sql} = require('../db'); // Import poolPromise from db.js

const router = express.Router();

// Get all students
router.get('/readstudents', async (req, res) => {
    try {
        const pool = await poolPromise; // Get a connection from the pool
        const result = await pool.request().query('SELECT * FROM students'); // Use pool.request()
        res.json(result.recordset);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error fetching students');
    }
});

// Add a new student
router.post('/createstudent', async (req, res) => {
    const { name, email, grade, standard } = req.body;
    try {
        const pool = await poolPromise; // Get a connection from the pool
        const result = await pool
            .request()
            .input('name', sql.NVarChar, name)
            .input('email', sql.NVarChar, email)
            .input('grade', sql.NVarChar, grade)
            .input('standard', sql.NVarChar, standard)
            .query('INSERT INTO students (name, email, grade, standard) VALUES (@name, @email, @grade, @standard)');
        res.status(201).json({ id: result.rowsAffected });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error adding student');
    }
});

// Update a student
router.put('/update/:id', async (req, res) => {
    const { id } = req.params;
    const { name, email, grade, standard } = req.body;
    try {
        const pool = await poolPromise; // Get a connection from the pool
        const result = await pool
            .request()
            .input('id', sql.Int, id)
            .input('name', sql.NVarChar, name)
            .input('email', sql.NVarChar, email)
            .input('grade', sql.NVarChar, grade)
            .input('standard', sql.NVarChar, standard)
            .query('UPDATE students SET name = @name, email = @email, grade = @grade, standard = @standard WHERE id = @id');
        res.json({ rowsAffected: result.rowsAffected });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error updating student');
    }
});

// Delete a student
router.delete('/delete/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const pool = await poolPromise; // Get a connection from the pool
        const result = await pool
            .request()
            .input('id', sql.Int, id)
            .query('DELETE FROM students WHERE id = @id');
        res.json({ rowsAffected: result.rowsAffected });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error deleting student');
    }
});

module.exports = router;
