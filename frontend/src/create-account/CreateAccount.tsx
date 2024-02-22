import { invoke } from '@tauri-apps/api/tauri';
import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './createAccount.scss';

interface CreateAccountProps {
}

const CreateAccount: React.FC<CreateAccountProps> = () => {
  
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [errorMessage, setErrorMessage] = useState('');

  type UserData = {
    firstName: string,
    lastName: string,
    pwd: string,
    email: string,
    phoneNumber: string,
    origin: string,
    accountNumber: string,
    balance: string,
    [key: string]: string
  }

  const [userData, setUserData] = useState<UserData>({
    firstName: '',
    lastName: '',
    pwd: '',
    email: '',
    phoneNumber: '',
    origin: '',
    accountNumber: '',
    balance: '',
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUserData(prevData => ({ ...prevData, [name]: value, [`step${step}`]: value }));
    setErrorMessage('');
  };

  const handleNext = () => {
    switch (step) {
      case  1:
        if (userData.firstName.trim() === '') {
          setErrorMessage('Please provide a legitimate first name');
        } else {
          setUserData(prevData => ({ ...prevData, step1: userData.firstName }))
          setStep(step +  1);
          setErrorMessage('');
        }
        break;
      case  2:
        if (userData.lastName.trim() === '') {
          setErrorMessage('Please provide a legitimate last name');
        } else {
          setUserData(prevData => ({ ...prevData, step2: userData.lastName }))
          setStep(step +  1);
          setErrorMessage('');
        }
        break;
      case  3:
        if (!validateEmail(userData.email)) {
          setErrorMessage('Please provide a legitimate email');
        } else {
          setUserData(prevData => ({ ...prevData, step3: userData.email }))
          setStep(step +  1);
          setErrorMessage('');
        }
        break;
      case  4:
        if (userData.pwd.trim() === '') {
          setErrorMessage('Please choose a secure password');
        } else {
          setUserData(prevData => ({ ...prevData, step4: userData.pwd }))
          setStep(step +  1);
          setErrorMessage('');
        }
        break;
      case  5:
        if (!validatePhone(userData.phoneNumber)) {
          setErrorMessage('Please enter a valid phone number');
        } else {
          setUserData(prevData => ({ ...prevData, step5: userData.phoneNumber }))
          setStep(step +  1);
          setErrorMessage('');
        }
        break;
      case  6:
        if (userData.origin.trim() === '') {
          setErrorMessage('Please enter your origin');
        } else {
          setUserData(prevData => ({ ...prevData, step6: userData.origin }))
          setStep(step +  1);
          setErrorMessage('');
        }
        break;
      case  7:
        if (userData.accountNumber.trim() === '') {
          setErrorMessage('Please enter your account number');
        } else {
          setUserData(prevData => ({ ...prevData, step7: userData.accountNumber }))
          setStep(step +  1);
          setErrorMessage('');
        }
        break;
      case  8:
        if (userData.balance.trim() === '') {
          setErrorMessage('Please enter your balance');
        } else {
          setUserData(prevData => ({ ...prevData, step8: userData.balance }))
          setStep(step +  1);
          setErrorMessage('');
        }
        break;
      default:
        break;
    }
  };

  const handleBack = () => {
    if(step > 1) {
      setUserData(prevData => ({ ...prevData, [`step${step}`]: '' }))
      setStep(step -   1);
    }
  };

  const handleSignUp = async (event: React.FormEvent) => {
    event.preventDefault();

    const userDataToSave = {
      user: {
      id: 0,
      is_admin: false,
      first_name: userData.firstName,
      last_name: userData.lastName,
      email: userData.email,
      pwd: userData.pwd,
      phone_number: userData.phoneNumber,
      origin: userData.origin,
      account_number: userData.accountNumber,
      balance: parseFloat(userData.balance),
      status: true,
      created_at: new Date().toISOString,
      updated_at: new Date().toISOString
      }
    };
    
    try {
    const savedUser = await invoke('save_user', userDataToSave);
    console.log('User saved', savedUser);
    navigate('/user');
    } catch(error) {
      console.error('ts failed to save user: ', error);
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      handleNext();
      event.preventDefault();
    }
  };

  const validateEmail = (email: string) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  };

  const validatePhone = (phone: string) => {
    const re = /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/;
    return re.test(phone);
  };

  const isStepCompleted = (stepNumber: number) => {
    return stepNumber <= step && userData[`step${stepNumber}`] !== '';
  }

  return (
    <div className="container">
      <div className="navigation">
        <ol>
          {isStepCompleted(1) && <li><a href="#" onClick={() => setStep(1)}>First Name</a></li>}
          {isStepCompleted(2) && <li><a href="#" onClick={() => setStep(2)}>Last Name</a></li>}
          {isStepCompleted(3) && <li><a href="#" onClick={() => setStep(3)}>Email</a></li>}
          {isStepCompleted(4) && <li><a href="#" onClick={() => setStep(4)}>Password</a></li>}
          {isStepCompleted(5) && <li><a href="#" onClick={() => setStep(5)}>Phone</a></li>}
          {isStepCompleted(6) && <li><a href="#" onClick={() => setStep(6)}>Origin</a></li>}
          {isStepCompleted(7) && <li><a href="#" onClick={() => setStep(7)}>Account Number</a></li>}
          {isStepCompleted(8) && <li><a href="#" onClick={() => setStep(8)}>Balance</a></li>}
        </ol>
      </div>
      <form id="sign-form" className="sign-form" onSubmit={handleSignUp}>
        <ol className="questions">
          {step ===  1 && (
            <li>
              <span><label htmlFor="firstName">Hi, What is your first name?</label></span>
              <input
                id="firstName"
                name="firstName"
                type="text"
                placeholder="Enter your first name"
                value={userData.firstName}
                onChange={handleChange}
                onKeyPress={handleKeyPress}
                autoFocus
              />
            </li>
          )}
          {step ===  2 && (
            <li>
              <span><label htmlFor="lastName">& what is your last name?</label></span>
              <input
                id="lastName"
                name="lastName"
                type="text"
                placeholder="Enter your last name"
                value={userData.lastName}
                onChange={handleChange}
                onKeyPress={handleKeyPress}
                autoFocus
              />
            </li>
          )}
          {step ===  3 && (
            <li>
              <span><label htmlFor="email">Enter your email</label></span>
              <input
                id="email"
                name="email"
                type="text"
                placeholder="Email"
                value={userData.email}
                onChange={handleChange}
                onKeyPress={handleKeyPress}
                autoFocus
              />
            </li>
          )}
            {step ===   4 && (
            <li>
            <span><label htmlFor="pwd">Choose a password</label></span>
            <input
              id="pwd"
              name="pwd"
              type="password"
              placeholder="Choose a password"
              value={userData.pwd}
              onChange={handleChange}
              onKeyPress={handleKeyPress}
              autoFocus
            />
          </li>
          )}
          {step ===  5 && (
            <li>
              <span><label htmlFor="phoneNumber">Enter your phone number</label></span>
              <input
                id="phoneNumber"
                name="phoneNumber"
                type="text"
                placeholder="Enter your phone number"
                value={userData.phoneNumber}
                onChange={handleChange}
                onKeyPress={handleKeyPress}
                autoFocus
              />
            </li>
          )}
          {step === 6 && (
  <li>
    <span><label htmlFor="origin">Enter your origin</label></span>
    <input
      id="origin"
      name="origin"
      type="text"
      placeholder="Enter your origin"
      value={userData.origin}
      onChange={handleChange}
      onKeyPress={handleKeyPress}
      autoFocus
    />
  </li>
)}
{step ===   7 && (
  <li>
    <span><label htmlFor="accountNumber">Enter your account number</label></span>
    <input
      id="accountNumber"
      name="accountNumber"
      type="text"
      placeholder="Enter your account number"
      value={userData.accountNumber}
      onChange={handleChange}
      onKeyPress={handleKeyPress}
      autoFocus
    />
  </li>
)}
{step ===   8 && (
  <li>
    <span><label htmlFor="balance">Enter your balance</label></span>
    <input
      id="balance"
      name="balance"
      type="number"
      placeholder="Enter your balance"
      value={userData.balance}
      onChange={handleChange}
      onKeyPress={handleKeyPress}
      autoFocus
    />
  </li>
)}
        </ol>
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        <div className='button-container'>
        {step <  8 ? (
          <button type="button" onClick={handleBack} className='back-button'>Back</button>
        ) : null}
        {step <  8 ? (
          <button type="button" onClick={handleNext} className='next-button'>Next</button>
        ) : (
          <button type="button" onClick={handleSignUp}>Sign Up</button>
        )}
        </div>
      </form>
      <h1 id="wf" style={{ opacity:   0, width: '600px', marginTop: '1.1em', display: 'none', marginBottom: '1em' }}>Thank you</h1>
      <Link to="/login" className='back-to-login'>Back to Login</Link>
    </div>
  );
};

export default CreateAccount;