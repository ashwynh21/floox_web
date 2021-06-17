import Head from 'next/head'
import React, {useEffect, useRef, useState} from "react";
import Button from "@material-ui/core/Button";
import Link from "next/link";
import CircularProgress from "@material-ui/core/CircularProgress";
import IconButton from "@material-ui/core/IconButton";
import Image from "next/image";

import styles from '../styles/Home.module.css'
import ButtonBase from "@material-ui/core/ButtonBase";
import TextField from "@material-ui/core/TextField";
import anime from "animejs";
import { socket } from '../scripts/environment';
import { count, join } from '../scripts/beta';
import { github } from '../scripts/github';
import io from 'socket.io-client';

function nudge(target) {
  anime({
    targets: [ target ],
    easing: 'easeOutQuad',
    scale: [
      { value: 1.1, duration: 180 },
      { value: 1, duration: 256 }
    ]
  })
}
function tocurrency(value) {
  const formatter = Intl.NumberFormat('en-US', {
    style: "currency",
    currency: "USD",
  });

  return formatter.format(value);
}

export default function Home() {
  const [general, online] = useState({});
  const [beta, teamer] = useState(undefined);
  const [email, mailer] = useState(undefined);
  const [error, checker] = useState(undefined);
  const [loading, loader] = useState(false);
  const [joined, subscriber] = useState(false);

  const clientRef = useRef(undefined);
  const profitRef = useRef(undefined);
  const winsRef = useRef(undefined);
  const losesRef = useRef(undefined);
  const container = useRef(undefined);

  const connector = (client) => {
    client.on('general/summary', (message) => {
      online(message.data);

      if(general.clients !== message.data.clients) {
        nudge(clientRef.current);
      }
      if(general.profit !== message.data.profit) {
        nudge(profitRef.current);
      }
      if(general.won !== message.data.won) {
        nudge(winsRef.current);
      }
      if(general.lost !== message.data.lost) {
        nudge(losesRef.current);
      }
    });
  };
  const handler = (event) => {
    if(!email || !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,253}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,253}[a-zA-Z0-9])?)*$/i.test(email)) {
      return checker('Please enter a valid Email Address i.e. username@example.com.');
    }
    loader(true);
    return join(email)
        .then(response => {
          subscriber(true);
        })
        .catch((error) => {
          loader(false);
          checker(error.message);
        })
  }
  const validator = (event) => {
    const email = event.target.value;

    mailer(email);
    if(!email || !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,253}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,253}[a-zA-Z0-9])?)*$/i.test(email)) {
      return checker('Please enter a valid Email Address i.e. username@example.com.');
    }

    return checker(undefined);
  }

  useEffect(() => {
    connector(io(socket, { transports: ['websocket'] }));
    github(container.current);
    count(teamer);
  }, [])

  return (
    <div>
      <Head>
        <title>Floox | Home</title>
        <meta name="description" content="A forex trading automation and integration platform" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.content}>
        <div>
          <p>AI Based Algorithmic Trading on <strong>MetaTrader</strong></p>
          <p>Take your trading to the next level on <strong>Floox</strong></p>
          <p>
            We offer state of the art learning algorithms and design adaptive algorithms that aim to maximize
            the intelligence and profitability on the forex environment.
          </p>
          <div>
            <Link href="/about">
              <Button className="primarybutton">Learn more</Button>
            </Link>
          </div>
        </div>
        <div className={styles.sublink}>
          <p>Take a look at how <strong>Floox</strong> automation is performing.</p>

          <div className={styles.grid}>
            <div>

              <ButtonBase ref={clientRef} focusRipple style={{backgroundImage: 'linear-gradient(to top right, #FF419A, #FF91EF)'}}>
                <div>
                  {
                    !isNaN(general.clients) && general.clients > -1
                        ?
                        general.clients
                        :
                        <CircularProgress size={24} color={'white'}/>
                  }
                </div>
              </ButtonBase>

              <div>
                <Image src="/icons/people.svg" height={20} width={20}/>
                <p>Active Clients</p>
              </div>
              <p>Clients that are currently online</p>
            </div>
            <div>

              <ButtonBase ref={profitRef} focusRipple style={{backgroundImage: 'linear-gradient(to top right, #5187B7, #A1D7FF)'}}>
                <div>
                  {
                    !isNaN(general.profit)
                        ?
                        tocurrency(general.profit)
                        :
                        <CircularProgress size={24} color={'white'}/>
                  }
                </div>
              </ButtonBase>

              <div>
                <Image src="/icons/money.svg" height={20} width={20}/>
                <p>Money Gains</p>
              </div>
              <p>The total gains generated by Floox automated trading</p>
            </div>
          </div>
          <div className={styles.grid}>
            <div>

              <ButtonBase ref={winsRef} focusRipple style={{backgroundImage: 'linear-gradient(to top right, #5187B7, #A1D7FF)'}}>
                <div>
                  {
                    !isNaN(general.won) && general.won > -1
                        ?
                        general.won
                        :
                        <CircularProgress size={24} color={'white'}/>
                  }
                </div>
              </ButtonBase>

              <div>
                <Image src="/icons/upload.svg" height={20} width={20}/>
                <p>Positions Won</p>
              </div>
              <p>Positions that were closed in profit</p>
            </div>
            <div>

              <ButtonBase ref={losesRef} focusRipple style={{backgroundImage: 'linear-gradient(to top right, #FF419A, #FF91EF)'}}>
                <div>
                  {
                    !isNaN(general.lost) && general.lost > -1
                        ?
                        general.lost
                        :
                        <CircularProgress size={24} color={'white'}/>
                  }
                </div>
              </ButtonBase>

              <div>
                <Image src="/icons/download.svg" height={20} width={20}/>
                <p>Positions Lost</p>
              </div>
              <p>Positions that were closed in loss</p>
            </div>
          </div>

          <p>We are still in development, please follow up on our release notes to get an idea of what we are busy
            with.
            <a target="_blank" href="https://www.github.com/ashwynh21/floox_web/commits">
              <IconButton>
                <Image src="/icons/github.svg" height={20} width={20}/>
              </IconButton>
            </a>
          </p>
        </div>
      </div>

      <div className={styles.started}>
        <p className={styles.title}>Get Started with <strong>Floox</strong></p>
        <p className={styles.description}>Since we're still in beta, for now we only accept sign up using your standard email
          address. We also accept Google or Facebook. However, in the future, we look to allowing our clients to get
          started with their direct broker account.</p>
        <div className={styles.emails}>
          <div>
            <img src="/icons/google.svg" alt="google"/>
              <p>Google</p>
          </div>
          <div>
            <img src="/icons/facebook.svg" alt="facebook"/>
              <p>Facebook</p>
          </div>
        </div>
        <p className={styles.description}>Setting your account up to use Floox assistance is really easy. All you have to do
          are these 3 items below and you're all set.</p>
        <div className={styles.steps}>
          <div>
            <p>Step 1</p>
            <div>
              <p>Sign Up</p>
              <p>Sign up and verify you email address</p>
            </div>
          </div>
          <div>
            <p>Step 2</p>
            <div>
              <p>Download EA</p>
              <p>Download the Floox Expert Advisor.</p>
            </div>
          </div>
          <div>
            <p>Step 3</p>
            <div>
              <p>Authenticate EA</p>
              <p>Launch your EA with your username.</p>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.github}>
        <div id="beta-test">
          <div>
            <p>🤓 <strong>Floox</strong> Beta team </p>
            <div></div>
            <p>Join today</p>
          </div>
          <p>We need all the help we can get!</p>
          <p>It's quite the sweat for our <strong>Dev</strong> team to get new features together, and we need extra
            hands to test out the new stuff we want to offer to everyone.</p>
          <p>If you want to help us out, fill in your email address in the form below, and we will add you to
            our <strong>Floox</strong> Beta team. Who knows, there might be something for your efforts in the end 😉.
          </p>

          <form style={{flexFlow: joined ? 'column' : 'row'}}>
            {
              joined ?
                  <>
                    <Button variant="outlined" style={{fontWeight: 'lighter', fontSize: '12pt', marginTop: '16px', background: 'transparent', color: '#164751'}}>
                      Great, we will get back to you via email
                    </Button>
                    <p style={{fontSize: '10pt', marginLeft: '0'}}>Thank you for requesting to participate in our beta test of <strong style={{color: '#7EC6FF'}}>Floox</strong>.</p>
                  </>
                  :
                  <>
                    <TextField type="email" label="Email Address" error={!!error} helperText={error} className={styles.input} variant="outlined" onChange={validator} error={!!error}/>
                    <Button className="tert-button" onClick={handler} disabled={!!error}>
                      {
                        loading ? <CircularProgress size={20} color={'white'}/> : <p>Join</p>
                      }
                    </Button>
                    <p id="count">
                      {
                        beta ?? '0/10'
                      }
                    </p>
                  </>
            }
          </form>
        </div>
        <div ref={container}>
          <div>
            <Image src="/icons/github.svg" width={32} height={32} alt="github"/>
            <p>Releases &amp; Commits</p>
          </div>

          <a target="_blank" href="https://www.github.com/ashwynh21/floox_web/commits">
            <Button>view more activity</Button>
          </a>
        </div>
      </div>

    </div>
  )
}
