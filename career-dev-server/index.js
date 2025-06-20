require('dotenv').config()
const { MongoClient, ServerApiVersion, ObjectId} = require('mongodb');
const express = require('express')
const cors = require('cors')
const app = express()
const port = process.env.PORT || 3000
app.use(cors())
app.use(express.json())


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.SECURITY_KEY}@careerdev.6rwjfy7.mongodb.net/?retryWrites=true&w=majority&appName=careerDev`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        // await client.connect();

        const jobsCollection = client.db('careerDev').collection('jobs')
        const applicationsCollection = client.db('careerDev').collection('applications')

        
        app.get('/jobs', async (req, res) => {
            const query = {}
            if (req.query.email) {
                query.hr_email = req.query.email
            }
            const result = await jobsCollection.find(query).toArray()
            res.send(result)
        })



        app.get('/jobs/:id', async (req, res) => {
            const query = {
                _id: new ObjectId(req.params.id)
            }
            const result = await jobsCollection.findOne(query)
            res.send(result)
        })

        app.post('/jobs', async (req, res) => {
            const result = await jobsCollection.insertOne(req.body)
            res.send(result)
        })

        app.get('/applications', async (req, res) => {
            const query = {
                applicant: req.query.email
            }
            const result = await applicationsCollection.find(query).toArray()

            for (const application of result) {
                const jobQuery = {
                 _id: new ObjectId(application.jobId)
                }
                const job = await jobsCollection.findOne(jobQuery)
                application.company = job.company
                application.title = job.title
                application.company_logo = job.company_logo

            }
            res.send(result)
        })

        app.get('/applications/job/:job_id', async (req, res) => {
            const query = {
                jobId: req.params.job_id
            }
            const result = await applicationsCollection.find(query).toArray()
            res.send(result)
        })

        app.post('/applications', async (req, res) => {
            const result = await applicationsCollection.insertOne(req.body)
            res.send(result)
        })



        // Send a ping to confirm a successful connection
        // await client.db("admin").command({ ping: 1 });
        // console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error

    }
}
run().catch(console.dir);


app.listen(port, () => {
    console.log(`server ${port}`)
})