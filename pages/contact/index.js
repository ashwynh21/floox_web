import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import React, {useEffect, useState} from "react";
import Image from "next/image";
import CircularProgress from "@material-ui/core/CircularProgress";
import { count, join } from '../../scripts/beta';
import { send } from "../../scripts/message";

import styles from '../../styles/Contact.module.css';

export default function Contact() {
    const [messaging, deliverer] = useState(false);
    const [joining, joiner] = useState(false);
    const [joined, subscriber] = useState(false);
    const [sent, complete] = useState(false);

    const [team, counter] = useState(undefined);
    const [beta, teamer] = useState(undefined);
    const [letter, messenger] = useState(undefined);
    const [error, checker] = useState(undefined);
    const [problem, reporter] = useState(undefined);

    const validator = (event) => {
        teamer(event.target.value);

        if(!beta || !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,253}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,253}[a-zA-Z0-9])?)*$/i.test(beta)) {
            return checker('Oops, email address is invalid.');
        }

        return checker(undefined);
    }
    const corrector = (event) => {
        messenger(event.target.value);

        if(!letter || letter.length <= 24) {
            return reporter('Oops, message is too short.');
        }

        return reporter(undefined);
    }
    const handler = (event) => {
        joiner(true);
        return join(beta)
            .then(response => {
                subscriber(true);
            })
            .catch((error) => {
                joiner(false);
                checker(error.message);
            })
    }
    const sender = (event) => {
        deliverer(true);
        return send(letter)
            .then(response => {
                complete(true);
            })
            .catch((error) => {
                deliverer(false);
                reporter(error.message);
            })
    }

    useEffect(() => {
        count(counter);
    }, [])

    return (
        <>
            <div className={styles.contact}>
                <p>Contact Us</p>
                <p>Hi there, we always busy working on ways to improve the experience of the services offered to our
                    community, but
                    once in a while you could catch us out and about on the web 😂.</p>
                <p>However, if you need to get in touch with us, here are a bunch of ways to do so.</p>

                <div className={styles.support}>
                    <p>Support Help</p>
                    <p>Need help with something, or have a concern you would like to raise with us?</p>
                    <p>Send us an email at <strong>support@floox.co.za</strong>, or simply drop your message here if you want to stay anonymous.</p>

                    <form style={{alignItems: sent ? 'center' : 'flex-start'}}>
                        {
                            sent
                            ?
                                <>
                                    <Button style={{fontWeight: 'lighter', fontSize: '12pt', marginTop: '16px'}} variant={'outlined'}>Awesome, thanks for touching base with us.</Button>
                                    <p style={{fontSize: '10pt', marginLeft: '0'}}>Thank you for requesting to participate in our beta test of
                                        <strong style={{color: '#7EC6FF', marginLeft: '4px'}}>Floox</strong>.
                                    </p>
                                </>
                                :
                                <>
                                    <TextField name="message" type="text" label="Message" multiline rows={4} variant="outlined"
                                               onChange={corrector} error={!!problem}/>
                                    <div>
                                        <Button className="tertbutton" disabled={!!problem} onClick={sender}>
                                            {
                                                !messaging ? <p>Send</p> : <CircularProgress size={24} color={'white'}/>
                                            }
                                        </Button>
                                        <p className={styles.message_error}>
                                            { problem }
                                        </p>
                                    </div>
                                </>
                        }
                    </form>
                </div>

                <div className={styles.social}>
                    <p>Social Media</p>
                    <p>If you want to catch on social media and ask the most non-technical stuff possible, that can done here.</p>
                    <div>
                        <a target="_blank" href="https://instagram/floox">
                            <Image src="/icons/instagram.svg" height={48} width={48}/>
                        </a>
                    </div>
                </div>

                <div className={styles.betas}>
                    <p>🤓 <strong>Floox</strong> Beta team</p>
                    <p>We need all the help we can get!</p>
                    <p>It's quite the sweat for our <strong>Dev</strong> team to get new features together, and we need
                        extra hands to test out the new stuff we want to offer to everyone.</p>
                    <p>If you want to help us out, fill in your email address in the form below, and we will add you to
                        our <strong>Floox</strong> Beta team. Who knows, there might be something for your efforts in
                        the end 😉.</p>

                    <form style={{alignItems: joined ? 'center' : 'flex-start'}}>
                        {
                            joined
                            ?
                                <>
                                    <Button variant="outlined" style={{fontWeight: 'lighter', fontSize: '12pt', marginTop: '16px', background: 'transparent', color: '#164751'}}>
                                        Great, we will get back to you via email
                                    </Button>
                                    <p style={{fontSize: '10pt', marginLeft: '0'}}>Thank you for requesting to participate in our beta test of <strong style={{color: '#7EC6FF'}}>Floox</strong>.</p>
                                </>
                                :
                                <>
                                    <TextField type="email" label="Email Address" className={styles.input} variant="outlined"
                                               onChange={validator} error={!!error}/>
                                    <div>
                                        <Button className="tertbutton" disabled={!!error} onClick={handler}>
                                            {
                                                !joining ? <p>Join</p> : <CircularProgress size={24} color={'white'}/>
                                            }
                                        </Button>
                                        <p>
                                            {
                                                team ?? '0/10'
                                            }
                                        </p>
                                    </div>
                                    <p className={styles.message_error}>
                                        {error}
                                    </p>
                                </>
                        }
                    </form>
                </div>

                <div className={styles.last} id="last">
                    <p>Need anything else?, you can contact us directly by sending an email
                        to <strong>info@floox.co.za</strong> and we'll get in touch "tout suit".</p>
                </div>
            </div>
        </>
    )
}
