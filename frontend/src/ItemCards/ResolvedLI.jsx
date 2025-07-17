import React from 'react'

function ResolvedLI({ imageUrl, name = "Arfaz Ansari", resolvingUsername, resolvingEmail, resolverUsername, resolverEmail, resolvingDate, phoneNumber }) {
  return (
    <div className="group flex flex-col h-full bg-white border border-gray-200 shadow-2xs rounded-xl dark:bg-neutral-900 dark:border-neutral-700 dark:shadow-neutral-700/70">


      <div className="h-52 flex flex-col bg-amber-50 justify-center items-center rounded-t-xl">
        <img className='h-full w-full object-fill rounded-t-xl' src={imageUrl} alt="error" srcSet="" />

      </div>
      <div className="p-4 md:p-6">
        <h3 className="block mb-1 font-semibold uppercase text-rose-600 dark:text-rose-500">
          {name}
        </h3>

        <hr />

        <div className="mt-3 flex items-center gap-1">
          <h6 ><span className='text-amber-600'>Requested By</span> :</h6>
          <p className="text-sm">{resolvingUsername}</p>
        </div>
        <div className="mt-3 flex items-center gap-1">
          <h6 ><span className='text-amber-600'>Requester Email</span> :</h6>
          <p className="text-sm">{resolvingEmail}</p>
        </div>

        <hr />

        <div className="mt-3 flex items-center gap-1">
          <h6 ><span className='text-amber-600'>Resolved By</span> :</h6>
          <p className="text-sm">{resolverUsername}</p>
        </div>
        <div className="mt-3 flex items-center gap-1">
          <h6 ><span className='text-amber-600'>Resolver Email</span> :</h6>
          <p className="text-sm">{resolverEmail}</p>
        </div>

        <hr />

        <div className="mt-3 flex items-center gap-1">
          <h6 ><span className='text-amber-600'>Contact No.</span> :</h6>
          <p className="text-sm">{phoneNumber}</p>
        </div>
        <div className="mt-3 flex items-center gap-1">
          <h6 ><span className='text-amber-600'>Resolved On</span> :</h6>
          <p className="text-sm">{new Date(resolvingDate).toLocaleDateString()}</p>
        </div>
      </div>
    </div>
  )
}

export default ResolvedLI
