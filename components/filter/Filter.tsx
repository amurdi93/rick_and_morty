/* eslint-disable no-unused-vars */
import React from 'react'
import { FilterProps } from 'types/types'
import Gender from './category/Gender'
import Species from './category/Species'
import Status from './category/Status'

const Filter = ({
  updatePageNumber,
  updateStatus,
  updateGender,
  updateSpecies
}: FilterProps) => {
  let clear = () => {
    updateStatus('')
    updateGender('')
    updateSpecies('')
    updatePageNumber(1)
    window.location.reload()
  }
  return (
    <div className="flex flex-col gap-[1rem]">
      <div className="bg-[#F3F4F6] rounded-lg p-[1rem] flex justify-between items-center sm:flex-col md:flex-row">
        <div className="text-[28px]">Filters</div>
        <div onClick={clear} className="cursor-pointer">
          Clear Filters
        </div>
      </div>
      <Status updatePageNumber={updatePageNumber} updateStatus={updateStatus} />
      <Species
        updatePageNumber={updatePageNumber}
        updateSpecies={updateSpecies}
      />
      <Gender updatePageNumber={updatePageNumber} updateGender={updateGender} />
    </div>
  )
}

export default Filter
