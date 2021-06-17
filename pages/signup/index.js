import TextField from "@material-ui/core/TextField";
import React, {useEffect, useState} from "react";
import Button from "@material-ui/core/Button";
import GoogleLogin from "react-google-login";
import {configuration} from "../../scripts/environment";
import IconButton from "@material-ui/core/IconButton";
import Image from "next/image";
import CircularProgress from "@material-ui/core/CircularProgress";
import Checkbox from "@material-ui/core/Checkbox";

import styles from '../../styles/Login.module.css';
import Head from "next/head";
import {signup, google, facebook} from "../../scripts/signup";

export default function Signup() {
    const [loading, loader] = useState(false);

    const [email, mailer] = useState(undefined);
    const [password, setter] = useState(undefined);
    const [confirm, afirm] = useState(undefined);
    const [checked, policy] = useState(false);
    const [error, checker] = useState(undefined);
    const [pass, passer] = useState(undefined);
    const [conf, afirmer] = useState(undefined);
    const [agree, contract] = useState(undefined)
    const [message, api] = useState(undefined);

    useEffect(() => {
        window.fbAsyncInit = function() {
            FB.init({
                appId      : '478448533393096',
                cookie     : true,
                xfbml      : true,
                version    : 'v10.0'
            });

            FB.AppEvents.logPageView();
        };
        (function(d, s, id){
            let js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) {return;}
            js = d.createElement(s); js.id = id;
            js.src = "https://connect.facebook.net/en_US/sdk.js";
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));

    } ,[]);

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
    const policyvalidate = (event) => {
        console.log(event.target.checked);
        const x = event.target.checked;

        policy(x);
        if(!x) {
            return contract('Please remember to read our policy agreement and disclaimer and agree to it before signing up.');
        }

        return contract(undefined);
    }

    const submit = (event) => {
        if(!email || !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,253}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,253}[a-zA-Z0-9])?)*$/i.test(email)) {
            return checker('Please enter a valid Email Address i.e. username@example.com.');
        }
        if(!password || password.length < 8) {
            return passer('Password must be at least 8 characters long.');
        }
        if(password !== confirm) {
            return afirmer('Passwords do not match');
        }
        if(!checked) {
            return contract('Please remember to read our policy agreement and disclaimer and agree to it before signing up.');
        }
        loader(true);
        api(undefined);
        return signup(email, password)
            .then(() => {
                window.location = './verify';
            })
            .catch((error) => {
                console.log(error);
                api(error.message);
            })
            .finally(() => {
                loader(false);
            })
    }
    const googlehandler = ({accessToken}) => {
        if(!checked) {
            return contract('Please remember to read our policy agreement and disclaimer and agree to it before signing up.');
        }
        loader(true);
        api(undefined);
        google(accessToken)
            .then(() => {
                window.location = './verify';
            })
            .catch((error) => {
                api(error.message)
            })
            .finally(() => {
                loader(false);
            })
    }
    const facebookhandler = (event) => {
        if(!checked) {
            return contract('Please remember to read our policy agreement and disclaimer and agree to it before signing up.');
        }
        loader(true);
        api(undefined);
        facebook()
            .then(() => {
                window.location = './verify';
            })
            .catch((error) => {
                api(error.message)
            })
            .finally(() => {
                loader(false);
            })
    }

    return (
        <form className={styles.signup}>
            <Head>
                <title>Floox | Sign up</title>
            </Head>
            <p>Create <strong>Floox</strong> Account</p>
            <p>Enter a valid email address, and password</p>

            <TextField onChange={emailvalidator} error={!!error} helperText={error} className={styles.input} label="Email Address" type="email" name="username" variant={'outlined'}/>
            <TextField onChange={passwordvalidator} error={!!pass} helperText={pass} className={styles.input} label="Password" type="password" name="password" variant={'outlined'}/>
            <TextField onChange={confirmvalidator} error={!!conf} helperText={conf} className={styles.input} label="Confirm Password" type="password" name="confirm" variant={'outlined'}/>

            <p>Please remember to read through our terms of use and application policies to make sure you are
                comfortable with everything.</p>

            <div className={styles.controls}>
                <Button className="primarybutton" onClick={submit} disabled={!!error || !!pass || !!conf || !!agree}>
                    {
                        loading ? <CircularProgress size={20} color={'white'}/> : <div>Sign Up</div>
                    }
                </Button>
                <div>
                    <GoogleLogin
                        clientId={configuration.client_id}
                        cookiePolicy={configuration.cookiepolicy}
                        render={({ onClick, disabled }) => (
                            <IconButton onClick={onClick} disabled={disabled}>
                                <Image src="/icons/google.svg" height={20} width={20} />
                            </IconButton>
                        )}
                        onSuccess={googlehandler}
                    />
                    <IconButton onClick={facebookhandler}>
                        <Image src="/icons/facebook.svg" height={20} width={20}/>
                    </IconButton>
                </div>
                <div className={styles.checkbox}>
                    <Checkbox
                        color="primary"
                        onChange={policyvalidate}
                        inputProps={{ 'aria-label': 'secondary checkbox' }}
                    />
                    <a target="_blank" href="../policy">policy &amp; disclaimer</a>
                </div>
            </div>
            <p>{ agree || message }</p>
        </form>
    )
}
