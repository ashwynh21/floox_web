import React, {useEffect, useRef, useState} from "react";
import styles from '../../styles/Login.module.css';
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import CircularProgress from "@material-ui/core/CircularProgress";
import IconButton from "@material-ui/core/IconButton";
import Image from "next/image";
import {login, google, facebook} from '../../scripts/login';
import Head from "next/head";
import {configuration} from "../../scripts/environment";
import GoogleLogin from "react-google-login";

export default function Login() {
    const [loading, loader] = useState(false);

    const [email, mailer] = useState(undefined);
    const [password, setter] = useState(undefined);
    const [error, checker] = useState(undefined);
    const [pass, valid] = useState(undefined);
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
        const email = event.target.value.trim();

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
            return valid('Password must be at least 8 characters long.');
        }

        return valid(undefined);
    }

    const loginhandler = (event) => {
        if(!email || !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,253}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,253}[a-zA-Z0-9])?)*$/i.test(email)) {
            return checker('Please enter a valid Email Address i.e. username@example.com.');
        }
        if(!password || password.length < 8) {
            return valid('Password must be at least 8 characters long.');
        }

        loader(true);
        api(undefined);
        return login(email, password)
            .then((user) => {
                window.location = './dashboard';
            })
            .catch((error) => {
                api(error.message);
            })
            .finally(() => {
                loader(false);
            })
    }
    const googlehandler = ({accessToken}) => {
        loader(true);
        api(undefined);
        google(accessToken)
            .then(() => {
                window.location = './dashboard';
            })
            .catch((error) => {
                api(error.message)
            })
            .finally(() => {
                loader(false);
            })
    }
    const facebookhandler = (event) => {
        loader(true);
        api(undefined);
        facebook()
            .then(() => {
                window.location = './dashboard';
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
                <title>Floox | Log in</title>
            </Head>
            <p>Log into <strong>Floox</strong></p>
            <p>Enter a valid email address, and password</p>
            <TextField onChange={emailvalidator} error={!!error} helperText={error} className={styles.input} label="Email Address" type="email" name="username" variant={'outlined'}/>
            <TextField onChange={passwordvalidator} error={!!pass} helperText={pass} className={styles.input} label="Password" type="password" name="password" variant={'outlined'}/>
            <div className={styles.controls}>
                <Button id="login" className="primarybutton" disabled={!!error || !!pass} onClick={loginhandler}>
                    {
                        loading ? <CircularProgress size={20} color={'white'}/> : <div>Log in</div>
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
                <Link href="/login/recover">
                    <Button style={{color: '#5187B7'}}>forgot password?</Button>
                </Link>
            </div>
            <p>{message}</p>
        </form>
    )
}
