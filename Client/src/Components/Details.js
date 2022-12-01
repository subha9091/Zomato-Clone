
import React from "react";
import '../Style/Details.css';
import queryString from 'query-string';
import axios from 'axios';
import Modal from 'react-modal';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

class Details extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            restaurant: {},
            resId: undefined,
            galleryModalIsOpen: false,
            menuItemsModalIsOpen: false,
            menuItems: [],
            subTotal: 0,
            formModalIsOpen: false,
            username: '',
            email: '',
            address: '',
            contact: ''
        }
    }

    componentDidMount() {
        const qs = queryString.parse(window.location.search);
        const { restaurant } = qs;

        axios({
            url: `http://localhost:8000/restaurant/${restaurant}`,
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        })
            .then(res => {
                this.setState({ restaurant: res.data.restaurants, resId: restaurant })
            })
            .catch(err => console.log(err))

    }

    handleSubmit = (e) => {
        e.preventDefault();
        console.log('email', this.state.email);
        console.log('address', this.state.address);
        console.log('contact', this.state.contact);
        const isValid = this.formValidation(isValid);
    }

    handleModal = (state, value) => {
        const { resId } = this.state;
        if (state == "menuItemsModalIsOpen" && value == true) {
            axios({
                url: `http://localhost:8000/menuitems/${resId}`,
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            })
                .then(res => {
                    this.setState({ menuItems: res.data.restaurants })
                })
                .catch(err => console.log(err))
        }
        this.setState({ [state]: value });
    }

    addItems = (index, operationType) => {
        let total = 0;
        const items = [... this.state.menuItems];
        const item = items[index];

        if (operationType == 'add') {
            item.qty += 1;
        } else {
            item.qty -= 1;
        }

        items[index] = item;

        items.map((item) => {
            total += item.qty * item.price;
        })
        this.setState({ menuItems: items, subTotal: total })
    }


    initPayment = (data) => {
        const options = {
            key: "rzp_test_UK33t2t9rQdBM4",
            amount: data.amount,
            currency: data.currency,
            description: "Test Transaction",
            order_id: data.id,
            handler: async (response) => {
                try {
                    const verifyUrl = "http://localhost:8000/api/payment/verify";
                    const { data } = await axios.post(verifyUrl, response);
                    console.log(data);
                } catch (error) {
                    console.log(error);
                }
            },
            theme: {
                color: "#fb3d0e",
            },
        };
        const rzp1 = new window.Razorpay(options);
        rzp1.open();
    }

    handlePayment = async () => {
        const { subTotal } = this.state;

        try {
            const orderUrl = "http://localhost:8000/api/payment/orders";
            const { data } = await axios.post(orderUrl, { amount: subTotal });
            console.log(data);
            this.initPayment(data.data);
        } catch (error) {
            console.log(error);
        }
    }


    render() {
        const { restaurant, galleryModalIsOpen, menuItemsModalIsOpen, menuItems, subTotal, formModalIsOpen } = this.state;
        const { username, email, address, contact, errors } = this.state;

        // let sbtotal = { subTotal }
        // console.log(sbtotal);
        return (
            <div>

                <div className="bodyDetail">
                    <div>
                        <img src={`./image/${restaurant.image}`} alt="No Image, Sorry for the Inconvinience" width="100%" height="350" />
                        <button className="button" onClick={() => this.handleModal('galleryModalIsOpen', true)}>Click to see Image Gallery</button>
                    </div>
                    <div className="DetailHeading">{restaurant.name}</div>
                    <button className="btn-pay btn btn-danger" onClick={() => this.handleModal('menuItemsModalIsOpen', true)}>Place Online Order</button>

                    <div className="tabs">
                        <div className="tab">
                            <input type="radio" id="tab-1" name="tab-group-1" checked />
                            <label for="tab-1">Overview</label>

                            <div className="content">
                                <div className="about">About this place</div>
                                <div className="DetailHead">Cuisine</div>
                                <div className="value">{restaurant && restaurant.cuisine && restaurant.cuisine.map(cuisine => `${cuisine.name}, `)}</div>
                                <div className="DetailHead">Average Cost</div>
                                <div className="value">&#8377; {restaurant.min_price} for two people(approx)</div>
                            </div>
                        </div>

                        <div className="tab">
                            <input type="radio" id="tab-2" name="tab-group-1" />
                            <label for="tab-2">Contact</label>
                            <div className="content">
                                <div className="DetailHead">Phone Number</div>
                                <div className="value">{restaurant.contact_number}</div>
                                <div className="DetailHead">{restaurant.name}</div>
                                <div className="value">{`${restaurant.locality}, ${restaurant.city}`}</div>
                            </div>
                        </div>
                    </div>
                </div>
                <Modal
                    isOpen={galleryModalIsOpen}
                    style={customStyles} >
                    <svg xmlns="http://www.w3.org/2000/svg" width="33" height="33" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16" style={{ float: 'right', margin: '0px 0px 10px 0px', cursor: "pointer", borderBottom: "1px solid red" }} onClick={() => this.handleModal('galleryModalIsOpen', false)}>
                        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                    </svg>
                    <Carousel showThumbs={false} showStatus={false}>
                        {restaurant?.thumb?.map((item) => {
                            return (
                                <div>
                                    <img src={`./image/${item}`} />
                                </div>
                            )
                        })}

                    </Carousel>

                </Modal>


                <Modal
                    isOpen={menuItemsModalIsOpen}
                    style={customStyles} >

                    <div>
                        {/* <div class="glyphicon glyphicon-remove" style={{ float: 'right', marginBottom: '10px' }}
                            onClick={() => this.handleModal('menuItemsModalIsOpen', false)}></div> */}
                        <div >
                            <svg xmlns="http://www.w3.org/2000/svg" width="33" height="33" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16" style={{ float: 'right', marginBottom: '10px' }} onClick={() => this.handleModal('menuItemsModalIsOpen', false)}>
                                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                            </svg>
                            <br />
                            <h3 className="restaurant-name">{restaurant.name}</h3>
                            <h4><span className="item-total">SubTotal : {subTotal}</span></h4>

                            <button className=" btn-pay btn btn-danger order-button pay" onClick={() => {

                                this.handleModal('menuItemsModalIsOpen', false);
                                this.handleModal('formModalIsOpen', true);


                            }}> Pay Now</button>

                            {menuItems.map((item, index) => {
                                return <div style={{ width: '30rem', marginTop: '10px', marginBottom: '10px', borderBottom: '2px solid #dbd8d8' }}>
                                    <div className="card" style={{ width: '29rem', margin: 'auto' }}>
                                        <div className="row" style={{ paddingLeft: '10px', paddingBottom: '10px' }}>
                                            <div className="col-xs-9 col-sm-9 col-md-9 col-lg-9 " style={{ paddingLeft: '10px', paddingBottom: '10px' }}>
                                                <span className="card-body">
                                                    <h5 className="item-name">{item.name}</h5>
                                                    <h5 className="item-price">&#8377;{item.price}</h5>
                                                    <p className="item-descp">{item.description}</p>
                                                </span>
                                            </div>
                                            <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3">
                                                <img className="card-img-center title-img" src={`../${item.image}`} style={{
                                                    height: '75px',
                                                    width: '75px',
                                                    borderRadius: '20px',
                                                    marginTop: '12px',
                                                    marginLeft: '3px'
                                                }} />
                                                {item.qty === 0 ? <div>
                                                    <button className="add-button" onClick={() => this.addItems(index, 'add')}>Add</button>
                                                </div> :
                                                    <div className="add-number">
                                                        <button onClick={() => this.addItems(index, 'substract')}>-</button>
                                                        <span class="qty">{item.qty}</span>
                                                        <button onClick={() => this.addItems(index, 'add')}>+</button>
                                                    </div>}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            })}
                            {/* <div className="card" style={{ width: '30rem', marginTop: '10px', marginBottom: '10px', margin: 'auto' }}>

                            </div> */}
                        </div>
                    </div>
                </Modal >
                <Modal
                    isOpen={formModalIsOpen}
                    style={customStyles}
                >
                    <form>
                        <svg xmlns="http://www.w3.org/2000/svg" width="33" height="33" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16" style={{ float: 'right', marginBottom: '10px', cursor: "pointer" }} onClick={() => this.handleModal('formModalIsOpen', false)}>
                            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                        </svg>
                        <h2>{restaurant.name}</h2>
                        <div>
                            <label>Name : </label>
                            <input className="form-control" style={{ width: '400px' }}
                                type="text" placeholder="Enter your Name" required />
                        </div>
                        <div>
                            <label>Email : </label>
                            <input className="form-control" style={{ width: '400px' }}
                                type="email" placeholder="Enter your Email" required />
                        </div>
                        <div>
                            <label>Address: </label>
                            <input className="form-control" style={{ width: '400px' }}
                                type="text" placeholder="Enter your Address" required />
                        </div>
                        <div>
                            <label>Contact Number : </label>
                            <input className="form-control" style={{ width: '400px' }}
                                type="number" placeholder="Enter your Contact Details" required />
                        </div>
                        <button className="btn btn-success"
                            style={{ float: 'right', marginTop: '20px' }} onClick={
                                this.handlePayment
                            }>Proceed</button>
                    </form>

                </Modal>

            </div >
        )
    }
}

export default Details;
