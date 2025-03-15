import React, { useState, useEffect } from 'react'
import { NavLink, useNavigate, useParams } from 'react-router-dom'
import { catagoryList as initialCategories } from '@/utils/catagoryList'
import { Image } from '@nextui-org/react'
import {Card, CardHeader, CardBody, CardFooter} from "@nextui-org/card";
import { motion } from 'framer-motion'

function Categories() {

  const [currentCategory, setCurrentCategory] = useState(null)
  const [parentCategory, setParentCategory] = useState("")
  const { slug } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    const filtered = initialCategories.filter(item => item.name === slug)
    if (filtered.length > 0) {
      setCurrentCategory(filtered[0].subcatagories)
      setParentCategory(filtered[0].name)
    }
  }, [slug])

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-2 trajan">{parentCategory}</h1>
      <p className="text-gray-600 mb-8 times">Explore our delicious {parentCategory.toLowerCase()} collection</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {currentCategory && currentCategory.map((item, index) => (
            <NavLink to={`/all-product/${item._id}`}>
                <Card 
            key={item._id}
            // onClick={() => navigate(`/catagory/${item._id}`)}
            className="cursor-pointer group overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
            <CardBody className="p-0">
              <div className="relative h-72 overflow-hidden">
                <Image
                  src={item.catagoryPic}
                  alt={item.catagoryName}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                  radius="none"
                />
                <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-30 transition-all duration-300" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold trajan">{item.catagoryName}</h3>
                <div className="mt-3 w-16 h-1 bg-[#BD9153] group-hover:w-20 transition-all duration-300" />
              </div>
            </CardBody>
          </Card>
            </NavLink>
          
        ))}
      </div>
    </div>
  )
}

export default Categories