import React, {useEffect, useState} from "react";
import TextField from "@material-ui/core/TextField";
import styles from '../../../styles/Login.module.css';
import CircularProgress from "@material-ui/core/CircularProgress";
import Button from "@material-ui/core/Button";
import {useRouter} from "next/router";
import {recover, reset} from "../../../scripts/recover";

export default function Recover() {
    const router = useRouter();

    const [toggle, toggler] = useState(false);
    const [loading, loader] = useState(false);

    const [email, mailer] = useState(undefined);
    const [password, setter] = useState(undefined);
    const [confirm, afirm] = useState(undefined);

    const [error, checker] = useState(undefined);
    const [pass, passer] = useState(undefined);
    const [conf, afirmer] = useState(undefined);

    const [message, api] = useState(undefined);
    const [recovered, complete] = useState(false);

    const emailvalidator = (event) => {
        const email = event.target.value;

        mailer(email);
        if(!email || !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,253}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,253}[a-zA-Z0-9])?)*$/i.test(email)) {
            return checker('Please enter a valid Email Address i.e. username@example.com.');
        }

        return checker(undefined);
    }
    const passwordvalidator = (event) => {
        const password = event.target.value;

        setter(password);
        if(!password || password.length < 8) {
            return passer('Password must be at least 8 characters long.');
        }

        return passer(undefined);
    }
    const confirmvalidator = (event) => {
        const confirm = event.target.value;

        afirm(confirm);
        if(password !== confirm) {
            return afirmer('Passwords do not match');
        }

        return afirmer(undefined);
    }

    useEffect(() => {
        const { _id, otp } = router.query;

        if(_id && otp) {
            toggler(true);
        }
    }, []);

    const submit = (event) => {
        if(toggle) {
            handlereset()
        } else {
            handlerecover();
        }
    }
    const handlereset = () => {
        const { _id, otp } = router.query;

        if(!password || password.length < 8) {
            return passer('Password must be at least 8 characters long.');
        }
        if(password !== confirm) {
            return afirmer('Passwords do not match');
        }
        loader(true);
        api(undefined);
        return reset(_id, otp, password)
            .then(() => {
                return router.push('/login');
            })
            .catch((error) => {
                api(error.message);
            })
            .finally(() => loader(false));
    }
    const handlerecover = () => {
        if(!email || !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,253}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,253}[a-zA-Z0-9])?)*$/i.test(email)) {
            return checker('Please enter a valid Email Address i.e. username@example.com.');
        }
        loader(true);
        api(undefined);
        return recover(email)
            .then(() => {
                complete(true);
            })
            .catch((error) => {
                api(error.message);
            })
            .finally(() => loader(false));
    }

    return (
        <form className={styles.signup}>
            <p>Recover <strong>Floox</strong> Account</p>
            {
                recovered ? <>
                    !toggled && <Button variant={'outlined'}>Your recovery link has been sent to your email address.</Button>
                </>
                :
                <>
                    <p>Enter your email address and we will send you a recovery link.</p>
                    {
                        !toggle ?
                            <TextField onChange={emailvalidator} error={!!error} helperText={error} label="Email Address" type="email" name="username" className={styles.input} variant={'outlined'} />
                            :
                            <>
                                <TextField onChange={passwordvalidator} error={!!pass} helperText={pass} label="New Password" type="password" name="password" className={styles.input} variant={'outlined'} />
                                <TextField onChange={confirmvalidator} error={!!conf} helperText={conf} label="Confirm Password" type="password" name="confirm" className={styles.input} variant={'outlined'} />
                            </>
                    }
                    <div className={styles.controls} style={{width: '100%'}}>
                        <Button id="recover" onClick={submit} className="primarybutton" disabled={(!toggle && !!error) || (toggle && !!pass && !!conf)}>
                            {
                                loading ? <CircularProgress size={20} color={'white'}/> : <div>Recover</div>
                            }
                        </Button>
                    </div>
                    <p>{ message }</p>
                </>
            }
        </form>
    )
}
