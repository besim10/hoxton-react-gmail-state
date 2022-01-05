import Header from './components/Header'
import initialEmails from './data/emails'
import { useState } from 'react'

import './App.css'


function App() {
 
  const [emails, setEmails] = useState(initialEmails)
  const [hideReadEmail, setHideReadEmail] = useState(false);
  function getInboxEmails(){
    const filteredEmail = emails.filter(function (email){
      return email.read === false
    })
    return filteredEmail.length
  }
  function getStarEmails(){
    const filteredEmail = emails.filter(function (email){
      return email.starred === true
    })
    return filteredEmail.length
  }
  function emailsToDisplay(){
    let updatedEmailList = emails
    if(hideReadEmail){
      updatedEmailList = updatedEmailList.filter(function (email){
        return email.read === false
      })
    }
    return updatedEmailList
  }
  function toggleHideRead(){
    setHideReadEmail(!hideReadEmail)
  }
  function toggleRead (email){
    return !email.read
  }
  
  function updateElementForRead(id,read){
    let foundElementIndex = emails.findIndex(email => email.id === id)
    emails[foundElementIndex].read = read
    let updatedEmails = [...emails]
    setEmails(updatedEmails)
  }
  function toggleStar (email){
    return !email.starred
  }
  function updateElementForStar(id,star){
    let foundElementIndex = emails.findIndex(email => email.id === id)
    emails[foundElementIndex].starred = star
    const updatedEmails = [...emails]
    setEmails(updatedEmails)
  }
  return (
    <div className="app">
      <Header />
      <nav className="left-menu">
        <ul className="inbox-list">
          <li
            className="item active"
            // onClick={() => {}}
          >
            <span className="label">Inbox</span>
            <span className="count">{getInboxEmails()}</span>
          </li>
          <li
            className="item"
            // onClick={() => {}}
          >
            <span className="label">Starred</span>
            <span className="count">{getStarEmails()}</span>
          </li>

          <li className="item toggle">
            <label for="hide-read">Hide read</label>
            <input
              id="hide-read"
              type="checkbox"
              name = 'test'
              checked={hideReadEmail}
              onChange={toggleHideRead}
            />
          </li>
        </ul>
      </nav>
      <main className="emails">{
        emailsToDisplay().map(email => (
          <ul>
            <li className = {`email ${email.read ? 'read' : 'unread'} `}>
              <input type="checkbox" checked = {email.read} name="" onClick={function(){
                const changedReadProperty = toggleRead(email)
                updateElementForRead(email.id,changedReadProperty)
              }}/>
              <input type="checkbox" checked = {email.starred} name="" className='star-checkbox' onChange={function(){
                const changedStarProperty = toggleStar(email)
                updateElementForStar(email.id,changedStarProperty)
              }}/>
              {email.sender}
              <div className='title'>{email.title}</div>
            </li>
          </ul>
        ))}
        </main>
    </div>
  )
}

export default App
