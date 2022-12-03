import React, { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Image, ListGroup, Card, Button, ListGroupItem } from 'react-bootstrap'
import Rating from '../components/Rating'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listProductDetails } from '../actions/productActions'


const ProductScreen = ({ match }) => {
    const dispatch = useDispatch()

    const params = useParams()

    const productDetails = useSelector( (state) => state.productDetails )
    

    // const [product, setProduct] = useState({})

    useEffect(() => {
        const fetchId = async () => {
            const res = await fetch( `http://localhost:3000/product/${params.id}`)
        }

        fetchId().then( dispatch(listProductDetails(params.id)))
    },[params.id, dispatch])

    const { loading, error, product } = productDetails


  return (

        <>
            <Link className='btn btn-light my-3' to='/'>
                Go Back
            </Link>
            {loading ? <Loader/> : error ? <Message variant='danger'>{error}</Message> : (
                            <Row>  
                            <Col md={6}>
                                <Image src={product.image} alt={product.name} fluid></Image>
                            </Col>
                            <Col md={3}>
                                <ListGroup variant='flush'>
                                    <ListGroup.Item>    
                                        <h3>{product.name}</h3>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Rating value={product.rating} text={`${product.numReviews} reviews`}></Rating>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        Price: {product.price}
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        Description: {product.description}
                                    </ListGroup.Item>
                                </ListGroup>
                            </Col>
                            <Col md={3}>
                                <Card>
                                    <ListGroup variant='flush'>
                                        <ListGroupItem>
                                            <Row>
                                                <Col>
                                                    Price
                                                </Col>
                                                <Col>
                                                    <strong>${product.price}</strong>
                                                </Col>
                                            </Row>
                                        </ListGroupItem>
            
                                        <ListGroupItem>
                                            <Row>
                                                <Col>
                                                    Status
                                                </Col>
                                                <Col>
                                                    {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                                                </Col>
                                            </Row>
                                        </ListGroupItem>
                                        <ListGroupItem>
                                            <Button className='btn-block' type='button' disabled={product.countInStock === 0}>
                                                Add To Cart
                                            </Button>
                                        </ListGroupItem>
                                    </ListGroup>
                                </Card>
                            </Col>
                        </Row>
            )}

        </>

  )
}

export default ProductScreen
