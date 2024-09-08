"use client"
import React, { useEffect } from 'react'
import { ProductCard01 } from './ProductCard01'
// import { products } from '@/constants/files';
import { Product } from '@/typing';
import { useQuery } from '@apollo/client'
import { GET_PRODUCTS_STORE } from '@/ApolloClient/productQueries'
import { Skeleton } from '../ui/skeleton';
import AdvancedError from '../common/AdvancedError';




type Products = {
    products: Product[]

}

const ProductCarousal01 = () => {
    const { loading, error, data } = useQuery(GET_PRODUCTS_STORE, {
        variables: { perPage: 4, page: 2 },
    });

    useEffect(() => {
        console.log(data?.products.edges)
    }, [data])

    const products = data?.products.edges

    if (error)
        return <AdvancedError message={error.message} />

    return (
        <div>
            <h3 className='font-bold text-lg p-3'>
                Featured Products
            </h3>
            <div
                className='md:p-3 grid grid-cols-2 md:grid-cols-3 lg:flex'
            >
                {loading &&
                    Array.from({ length: 4 }).map((_, i) => (
                        <Skeleton key={i} className="w-full m-3 rounded-md h-[300px]" />
                    ))
                }

                {data && products.map(({ node }) => (

                    <ProductCard01
                    imgurl={node.imageUrl[0]}
                        key={node.id}
                        title={node.name}
                        price={node.price}
                        mrp={node.price}
                    />
                ))}


            </div>

        </div>
    )
}

export default ProductCarousal01