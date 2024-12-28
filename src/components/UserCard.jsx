import React from 'react'

const UserCard = ({user}) => {
  
  const {firstName, lastName, age, gender, photoUrl, about, skills} = user
    
  return (
    <div>
        <div className="card bg-base-300 w-80 shadow-xl my-10 mx-auto ">
        <figure>
            <img
            src={photoUrl}
            alt={firstName} />
        </figure>
        <div className="card-body">
            <h2 className="card-title">{firstName + " " + lastName}</h2>
            <p className='py-2'>{age + " "  + gender}</p>
            <p className='py-2'>{about}</p>
            <div className='flex gap-x-4 flex-wrap py-2'>
                {skills?.map(skill => <p className='' key={skill}>{skill}</p>)}
            </div>
            <div className="card-actions justify-between my-4">
            <button className="btn btn-primary">Ignore</button>
            <button className="btn btn-secondary">Interested</button>
            </div>
        </div>
        </div>
    </div>
  )
}

export default UserCard