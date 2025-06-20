import axios from 'axios';
import {useParams} from 'react-router';
import {useQuery} from '@tanstack/react-query';


const applicationDetails = async id => {
    const response = await axios.get(`${import.meta.env.VITE_SERVER}/applications/job/${id}`)
    return response.data
}

const ViewApplication = () => {

    const {id} = useParams()
    const {data: jobId} = useQuery({
        queryKey: ['jobId', id],
        queryFn: () => applicationDetails(id)
    })
    // console.log(jobId)


    return (
        <div>
            <h2 className="text-4xl">job view applications {jobId?.length}</h2>

            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                    <tr>
                        <th></th>
                        <th>Name</th>
                        <th>Job</th>
                        <th>Status</th>
                    </tr>
                    </thead>
                    <tbody>
                    {/* row 1 */}


                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ViewApplication;