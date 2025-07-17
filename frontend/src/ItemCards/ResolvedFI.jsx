import React from 'react'

function ResolvedFI(imageUrl, name, resolvingUsername, resolvingEmail, resolverUsername, resolverEmail, resolvingDate, phoneNumber) {
  return (
    <div className="group flex flex-col h-full bg-white border border-gray-200 shadow-2xs rounded-xl dark:bg-neutral-900 dark:border-neutral-700 dark:shadow-neutral-700/70">


      <div className="h-52 flex flex-col bg-amber-50 justify-center items-center rounded-t-xl">
        <img className='h-full w-full object-fill rounded-t-xl' src='data:image/jpeg;base64,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' alt="error" srcSet="" />

      </div>
           <div className="p-4 md:p-6">
        <h3 className="block mb-1 font-semibold uppercase text-rose-600 dark:text-rose-500">
          {name}
        </h3>


        <hr />

        <h6 className="mt-3 text-white">
          <span className='text-amber-600'>  Requested By </span> :  {resolvingUsername}
        </h6>
        <h6 className="mt-3 text-white">
          <span className='text-amber-600'>  Requester Email </span>: {resolvingEmail}
        </h6>


        <hr />

        <h6 className="mt-3 text-white">
          <span className='text-amber-600'>  Resolved By </span>: {resolverUsername}
        </h6>
        <h6 className="mt-3 text-white">
          <span className='text-amber-600'>  Resolver Email </span>: {resolverEmail}
        </h6>
        <hr />
        <h6 className="mt-3 text-white">
          <span className='text-amber-600'>  Contact No. </span> : {phoneNumber}
        </h6>
        <h6 className="mt-3 text-white">
          <span className='text-amber-600'>  Resolved On </span>: {new Date(resolvingDate).toLocaleDateString()}
        </h6>
      </div>
    </div>
  )
}

export default ResolvedFI
