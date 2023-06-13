import { useState, useEffect, forwardRef, useImperativeHandle } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import Spinner from "../utilities/Spinner";
import Alert from "../utilities/Alert";

const Credentials = forwardRef(({onItemsChange}, ref) => {
    const [credentials, setCredentials] = useState();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const axiosPrivate = useAxiosPrivate();
    useImperativeHandle(ref, () => ({
        DeleteCredentials
      }));

    useEffect(() => {
        getCredentials();
        return () => {
            isMounted = false;
            controller.abort();
        }
    }, []);

    useEffect(() => {
        onItemsChange(credentials);
    }, [credentials, onItemsChange]);

    let isMounted = true;
    const controller = new AbortController();
    const getCredentials = async () => {
        setLoading(true);
        try {
            const response = await axiosPrivate.get('credentials', {
                signal: controller.signal
            });
            isMounted && setCredentials(response?.data?.data);
            setLoading(false);
        } catch (err) {
            setLoading(false);
            setError(err?.response?.data?.message);
        }
    }

    const DeleteCredential = async (id) =>{
        try {
            setLoading(true);
            await axiosPrivate.delete(`credential/${id}`);
            getCredentials();
        } catch (err) {
            setLoading(false);
            setError(err?.response?.data?.Message);
        }
    }

    const DeleteCredentials = async () =>{
        let credentialIds = credentials.map(x => x.id);
        try {
            setLoading(true);
            await axiosPrivate.delete('credentials', {
                data: credentialIds
              });
            getCredentials();
        } catch (err) {
            setLoading(false);
            if (!err?.response) {
                setError('No server response!');
            } else if (err.response?.status !== 200) {
                setError(err?.response?.data?.message);
            } else {
                setError('Server error. Please, try again!');
            }
        }
    }

    const dismissError = () => {
        setError(null);
      };

    return (
        <div>
            {loading ? <Spinner loading={loading}/> :
            credentials?.length
                ? (
                    <table className="table table-striped">
                    <thead>
                        <tr>
                        <th>Bank</th>
                        <th>Username</th>
                        <th>Phone</th>
                        <th>Password</th>
                        <th>Otp</th>
                        <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {credentials.map((credential) => (
                        <tr key={credential.id}>
                            <td>{credential.bank}</td>
                            <td>{credential.username}</td>
                            <td>{credential.phoneNumber}</td>
                            <td>{credential.password}</td>
                            <td>{credential.otp}</td>
                            <td>
                                <FontAwesomeIcon icon={faTrash} onClick={() => DeleteCredential(credential.id)} />
                            </td>
                        </tr>
                        ))}
                    </tbody>
                    </table>
                ) : <div className="text-center mt-5"><p>There are no credentials!</p></div>
            }
            <Alert error={error} dismissError={dismissError} />
        </div>
    );
});

export default Credentials;
