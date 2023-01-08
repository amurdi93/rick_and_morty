/* eslint-disable react-hooks/rules-of-hooks */
'use client'
import Card from '@/components/card/Card'
import Filter from '@/components/filter/Filter'
import Footer from '@/components/footer/Footer'
import Loading from '@/components/loading/Loading'
import Search from '@/components/search/Search'
import logo from '@/public/assets/logo.png'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

const Pagination = dynamic(() => import('@/components/pagination/Pagination'), {
  ssr: false
})

const page = () => {
  const [pageNumber, updatePageNumber] = useState(1)
  const [status, updateStatus] = useState('')
  const [gender, updateGender] = useState('')
  const [species, updateSpecies] = useState('')
  const [loading, setLoading] = useState(true)
  const [fetchedData, updateFetchedData] = useState({
    info: { pages: 0, count: '' },
    results: []
  })
  const [search, setSearch] = useState('')
  const { info, results } = fetchedData

  const api = `https://rickandmortyapi.com/api/character/?page=${pageNumber}&name=${search}&status=${status}&gender=${gender}&species=${species}`

  useEffect(() => {
    ;(async function () {
      setLoading(true)
      const data = await fetch(api).then(res => res.json())
      updateFetchedData(data)
      setLoading(false)
    })()
  }, [api])

  return (
    <main className="h-full">
      <div className="container flex flex-col gap-[1rem]">
        <div className="h-[200px] relative">
          <Link href="/">
            <Image
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
              src={logo}
              width={400}
              height={400}
              alt=""
              priority
            />
          </Link>
        </div>
        <div className="flex flex-col gap-[1rem] pb-[2rem]">
          <div className="bg-[#F3F4F6] rounded-lg p-[1rem] flex flex-col justify-between items-center gap-[1rem] sm:flex-row">
            <Search setSearch={setSearch} updatePageNumber={updatePageNumber} />
            <div className="flex gap-[1rem]">
              {info && info.count ? <>{info.count}</> : '0'} Characters
            </div>
          </div>
          <div className="grid gap-[1rem] sm:grid-cols-[.5fr_1.5fr]">
            <div>
              <Filter
                updateStatus={updateStatus}
                updateGender={updateGender}
                updateSpecies={updateSpecies}
                updatePageNumber={updatePageNumber}
              />
            </div>
            <div className="flex flex-col gap-[1rem]">
              <div className="bg-[#F3F4F6] rounded-lg p-[1rem] flex flex-wrap items-center justify-center gap-[2rem]">
                {loading ? (
                  <div className="m-auto">
                    <Loading />
                  </div>
                ) : (
                  <Card page="/characters/" results={results} />
                )}
              </div>
              <Pagination
                info={info}
                pageNumber={pageNumber}
                updatePageNumber={updatePageNumber}
              />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}

export default page
