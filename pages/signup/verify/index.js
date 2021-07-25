import React, {useEffect} from "react";
import Button from "@material-ui/core/Button";
import styles from '../../../styles/Login.module.css';
import Link from "next/link";
import {useRouter} from "next/router";
import {useState} from "react";
import {verify, request} from "../../../scripts/verify";
import CircularProgress from "@material-ui/core/CircularProgress";
import Head from "next/head";

export default function Verify() {
    const router = useRouter();
    const [message, setter] = useState(false);
    const [loading, trigger] = useState(false);

    useEffect(() => {
        const user = localStorage.getItem('user');

        const data = new URLSearchParams(window.location.search);
        const _id = data.get('_id');
        const otp = data.get('otp');

        if(!user) {
            router.push('/login');
        }
        else if(JSON.parse(user).verified) {
            router.push('/dashboard');
        }
        else if(!(_id && otp)) {
            // this is an invalid request
            setter(true)
        }
        else {
            // run verification process;
            trigger(true);

            return verify(JSON.parse(user), { _id, otp })
                .then((repsonse) => {
                    router.push('/dashboard');
                })
                .catch((error) => {
                    setter(true);
                })
                .finally(() => trigger(false))
        }
    }, []);

    const handler = () => {
        trigger(true);
        return request(JSON.parse(localStorage.getItem('user')))
            .then((result) => {
                setter(false);
            })
            .catch(error => {
                setter(true);
            })
            .finally(() => {
                trigger(false);
            })
    }

    return (
        <form className={styles.signup}>
            <Head>
                <title>Floox | Verify</title>
            </Head>
            <p>Verify <strong>Floox</strong> Account</p>

            {
                message
                ?
                    <>
                        <p style={{color: '#f44336', fontWeight: 'normal', textAlign: 'center'}}>
                            Invalid verification request, please check your emails for your verification link.
                        </p>
                        <p style={{fontWeight: 'normal', textAlign: 'center'}}>If you did not get an email, click the resend button below and we will send a new verification link.</p>
                        <Button onClick={handler} className="primarybutton" style={{color: 'white', width: '80px', boxShadow: '0 0 1px 4px #00000005'}}>
                            {
                                loading ? <CircularProgress size={20} color={'white'}/> : <>Resend</>
                            }
                        </Button>
                    </>
                :
                    <>
                        <p>Thanks for joining the Floox community, we have just sent you an email to verify your account.</p>
                        <div>
                            <Link href="/login">
                                <Button className="primarybutton" style={{color: 'white'}}>Log in</Button>
                            </Link>
                        </div>
                    </>
            }
        </form>
    )
}
