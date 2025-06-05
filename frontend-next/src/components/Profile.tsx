'use client';

export default function Profile() {
  return (
    <div className="bg-white p-19 rounded shadow-md w-full max-w-lg mx-auto mt-15">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">プロフィール</h2>

      <div className = "flex justify-center items-center mb-6">
          <img
            className="w-20 h-20 rounded-full border-2 bg-blue-500 mb-4"
            />
        </div>

      <form className="flex flex-col gap-4">
        <label htmlFor = "name" className="block text-gray-800 font-medium">名前</label>
        <input
          id="name"
          type="text"
          className="border p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <label htmlFor="email" className="block text-gray-800 font-medium">メールアドレス</label>
        <input
          id = "email"
          type="text"
          className="text- border p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <label htmlFor="email" className="block text-gray-800 font-medium">自己紹介</label>
        <textarea 
          id="message" 
          rows="4" 
          className= "text-black border p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="自己紹介を入力してください"
          >
        </textarea>

        <button 
          type="button" 
          className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 "
          >
            保存する
        </button>
      </form>
    </div>
  );
}