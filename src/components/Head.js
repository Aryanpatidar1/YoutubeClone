import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import { addSearch } from '../utils/store/slices/searchSlice';
import { YOUTUBE_SEARCH_API } from '../utils/constants';


const Head = ({ menuTogglerHandel }) => {
  const dispatch = useDispatch();
  const oldSearchData = useSelector(store => store.search.search);


  const [searchSuggestions, setSearchSugessions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [miniSearch, setMiniSearch] = useState(false);
  const [isLogged, setIsLogged] = useState(false);
  const [isSignOpen, setIsSignOpen] = useState(false);
  const navigate = useNavigate();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim().length > 0) {
      setShowSuggestions(false);
      navigate(`/search?q=${searchQuery}`);
    }
  }


  const fetchSearchSuggestions = async (query) => {
    if (!query) {
      setSearchSugessions([]);
      return;
    }
    try {
      const data = await fetch(YOUTUBE_SEARCH_API + query);
      const json = await data.json();
      const searchData = json[1]; // [[],'q]
      setSearchSugessions(searchData);
      dispatch(addSearch({ query: query, data: searchData }));
    } catch (error) {
      console.warn("CORS Blocked search API. Generating mock autocomplete suggestions.");
      // Provide robust mock suggestions directly related to their query
      const mockSuggestions = [
        `${query} tutorial for beginners`,
        `${query} full course 2024`,
        `${query} vs javascript`,
        `how to learn ${query}`,
        `${query} interview questions`,
        `${query} crash course in 100 seconds`,
        `${query} complete roadmap`,
        `building a youtube clone in ${query}`,
      ];
      setSearchSugessions(mockSuggestions);
      dispatch(addSearch({ query: query, data: mockSuggestions }));
    }
  }

  useEffect(() => {
    if (oldSearchData[searchQuery]) {
      setSearchSugessions(oldSearchData[searchQuery]);

    }
    else {
      const timer = setTimeout(() => {

        fetchSearchSuggestions(searchQuery);
      }, 200)
      return () => {
        clearTimeout(timer);
      }
    }

  }, [searchQuery])

  const handleSearchFocus = () => {
    if (searchQuery.length > 0) {
      setShowSuggestions(true)
    }
    else {
      setShowSuggestions(false);
    }
  }
  const handleSearchBlur = () => {
    setTimeout(() => { setShowSuggestions(false) }, 200);
  }

  const handleSearchInput = (e) => {
    setSearchQuery(e.target.value);

  }

  useEffect(() => {
    handleSearchFocus();
  }, [searchQuery])

  return (
    <>
      <div className='sm:px-3 px-1.5 flex justify-between items-center fixed bg-white w-full top-0 z-10 h-16' >
        {(!miniSearch) ?
          <>

            <div className='flex items-center sm:w-4/12' >
              <div>
                <button className='px-3 py-2  cursor-pointer rounded-full hover:bg-gray-100' onClick={() => menuTogglerHandel()}>
                  <i className="fa-solid fa-bars fa-lg"></i>
                </button>

              </div >
              <Link to={'/'}>

                <img className='w-28 ml-4 hidden sm:block object-contain h-6 mt-1' srcSet="https://upload.wikimedia.org/wikipedia/commons/b/b8/YouTube_Logo_2017.svg" alt="youtube logo" />

                <img className='w-10 ml-2  sm:hidden block object-contain h-6 mt-1' srcSet="https://upload.wikimedia.org/wikipedia/commons/0/09/YouTube_full-color_icon_%282017%29.svg" alt="youtube logo" />


              </Link >
            </div >

            <form onSubmit={handleSearchSubmit} className='sm:flex justify-between sm:w-7/12  hidden' >
              <div className=' sm:w-full' >
                <input type="text" className='px-5 py-2  w-full  sm:block   border border-gray-400 rounded-full rounded-e-none focus:border-blue-400 outline-none broder ' placeholder='Search ' onChange={(e) => setSearchQuery(e.target.value)} value={searchQuery} onFocus={handleSearchFocus} onBlur={handleSearchBlur} />
              </div>

              <button type="submit" className='border py-2   sm:px-6 px-2 border-gray-400 rounded-full rounded-s-none border-s-0 bg-gray-50 hover:drop-shadow-sm hover:bg-gray-100 ' > <i className="fa-solid fa-magnifying-glass fa-regular "></i></button >

            </form >



            <div className='flex justify-between items-center'>

              <button className=' py-1.5 px-3 border-gray-400 rounded-full  bg-gray-50 hover:drop-shadow-sm hover:bg-gray-100 sm:hidden block' > <i className="fa-solid fa-magnifying-glass fa-regular " onClick={() => setMiniSearch(true)}></i></button >

              <button className='   px-3 py-1 ml-4 cursor-pointer rounded-full bg-gray-100  hover:bg-gray-200' > <i className="fa-solid fa-microphone fa-lg "></i></button >



              <div className='hover:border-0 hover:rounded-full hover:bg-gray-100  p-3  ml-1 sm:ml-2 cursor-pointer'>
                <i className="fa-regular fa-square-plus fa-xl "></i>

              </div>
              <div className='hover:border-0 hover:rounded-full hover:bg-gray-100   p-3  ml-1 sm:ml-2 cursor-pointer' >
                <i className="fa-regular fa-bell fa-xl "></i>

              </div >
              {isLogged ? (
                  <div className='relative ml-1 sm:ml-4 cursor-pointer'>
                      <img src="https://picsum.photos/100/100?random=99" alt="User Avatar" className="w-9 h-9 rounded-full object-cover border border-gray-300" onClick={() => setIsSignOpen(!isSignOpen)} />
                      {isSignOpen && (
                          <div className='absolute right-0 mt-3 w-60 bg-white shadow-2xl rounded-xl z-20 overflow-hidden border border-gray-100 py-2'>
                              <div className='px-4 py-3 flex items-start'>
                                  <img src="https://picsum.photos/100/100?random=99" className='w-10 h-10 rounded-full' alt="avatar" />
                                  <div className='ml-3'>
                                      <div className='text-sm font-semibold'>React Developer</div>
                                      <div className='text-xs text-gray-800 mt-1'>@reactdev</div>
                                  </div>
                              </div>
                              <hr className='my-2 border-gray-200' />
                              <div className='hover:bg-gray-100 px-4 py-2 text-sm text-gray-700 font-medium' onClick={() => {setIsLogged(false); setIsSignOpen(false)}}>
                                  <i className="fa-solid fa-arrow-right-from-bracket mr-3 text-gray-500"></i>Sign out
                              </div>
                          </div>
                      )}
                  </div>
              ) : (
                  <button onClick={() => setIsLogged(true)} className='ml-2 sm:ml-4 px-3 py-1.5 flex items-center gap-2 border border-gray-200 text-blue-600 font-bold rounded-full hover:bg-blue-50 transition-colors whitespace-nowrap'>
                      <i className="fa-regular fa-circle-user fa-lg"></i> Sign in
                  </button>
              )}
            </div >
          </> :

          <form onSubmit={handleSearchSubmit} className='flex    w-full mt-2 mb-2' >

            <input type="text" className='px-5 py-2  w-full  sm:block   border border-gray-400 rounded-full rounded-e-none focus:border-blue-400 outline-none broder ' placeholder='Search ' onChange={handleSearchInput} value={searchQuery} onFocus={handleSearchFocus} onBlur={handleSearchBlur} />

            <div className=''>

              <button type="button" className='border py-2   px-6  border-gray-400 rounded-full rounded-s-none border-s-0 bg-gray-50 hover:drop-shadow-sm hover:bg-gray-100 ' onClick={() => setMiniSearch(false)}> <i className="fa-solid fa-xmark fa-xl"></i> </button >
            </div >

          </form >

        }
      </div>
      {
        showSuggestions &&

        <div className='flex justify-center'>
          <div className='fixed bg-white  z-10  sm:w-8/12 w-full md:7/12 shadow-2xl rounded-2xl mt-16' >


            <ul className='py-3' >

              {
                searchSuggestions?.map((data, i) => (

                  <div key={data + i}>
                    <Link to={('search?q=' + data)} onClick={() => setShowSuggestions(false)}>
                      <li className='transition-all cursor-pointer px-4 hover:bg-gray-200'>
                        <div className='px-2 py-2  capitalize text-base flex items-center'>
                          <i className="fa-solid fa-magnifying-glass mr-2"></i>
                          {data}
                        </div>
                      </li>
                    </Link >
                  </div>
                ))
              }
            </ul>
          </div>
        </div>


      }



    </>
  )
}

export default Head