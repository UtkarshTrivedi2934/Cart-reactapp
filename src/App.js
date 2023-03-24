import React from 'react';
// import ReactDOM from 'react-dom/client';
// import "./App.css";
// import CartItem from './CartItem';
import Cart from "./Cart";
import Navbar from "./Navbar";
// import * as firebase from "firebase";
import firebase from 'firebase/app';


class App extends React.Component {
  constructor() {
    super();
    this.state = {
      products: [],
      loading: true
    }
    this.db = firebase.firestore();
  }

  // componentDidMount() {
  //   firebase
  //     .firestore()
  //     .collection("products")
  //     .get()
  //     .then(snapshot => {
  //       const products = snapshot.docs.map(doc => {
  //         const data = doc.data();
  //         data["id"] = doc.id;
  //         return data;
  //       });
  //       this.setState({ products: products, loading: false });
  //     });
  // }

  componentDidMount() {
    this.db
      .collection("products") 
      // .where('price','==',10000)
      // .where('title','==','mouse')
      .orderBy('price','desc')
      .onSnapshot(snapshot => {
        const products = snapshot.docs.map(doc => {
          const data = doc.data();
          data["id"] = doc.id;
          return data;
        });
        this.setState({ products: products, loading: false });
      });

  }

  handleIncreaseQuantity = product => {
    const { products } = this.state;
    const index = products.indexOf(product);
    // products[index].qty += 1;
    // this.setState({
    //   products
    // });

    const docRef = this.db.collection('products').doc(products[index].id);

    docRef
      .update({
        qty: products[index].qty+1
      })
      .then(() => {
        console.log('document updated successfully');
      })
      .catch((error) =>{
        console.log('error! ',error);
      })
  };

  handleDecreaseQuantity = product => {
    const { products } = this.state;
    const index = products.indexOf(product);

    if (products[index].qty === 0) {
        return;
    }
    // products[index].qty -= 1;

    // this.setState({
    //   products
    // });

    const docRef = this.db.collection('products').doc(products[index].id);

    docRef
      .update({
        qty: products[index].qty-1
      })
      .then(() => {
        console.log('document updated successfully');
      })
      .catch((error) =>{
        console.log('error! ',error);
      })
  };

  handleDeleteProduct = id => {
    const { products } = this.state;

    // const items = products.filter(product => product.id !== id);

    // this.setState({
    //   products: items
    // });

    const docRef = this.db.collection('products').doc(id);
    docRef
      .delete()
      .then(() => {
        console.log('deleted successfully');
      })
      .catch((error) =>{
        console.log('error! ',error);
      })


  };

  getcountOfCartItems = () => {
    const { products } = this.state;
    let count = 0;

    products.forEach(product => {
      count += product.qty;
    });

    return count;
  };

  getcartTotal = () => {
    const { products } = this.state;
    let cartTotal = 0;

    products.map(product => {
      if (product.qty > 0) {
        cartTotal = cartTotal + product.qty * product.price;
      }
      return "";
    });

    return cartTotal;
  };

  addProduct = () => {
      this.db
    .collection('products')
    .add({
      img: 'data:image/jpeg;base64,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',
      price: 900,
      qty: 3,
      title: 'washing machine'
    })
    .then((docRef) => {
      console.log("product has been added",docRef);
    })
    .catch((error) => {
      console.log('Error: ',error);
    })
  }

  render() {
    const { products, loading } = this.state;
    return (
      <div className="App">
        <Navbar count={this.getcountOfCartItems()} />
        {/* <button onClick={this.addProduct} style = {{padding:20,fontSize: 20}}>Add a product</button> */}
        <Cart
          onIncreaseQuantity={this.handleIncreaseQuantity}
          onDecreaseQuantity={this.handleDecreaseQuantity}
          onDeleteProduct={this.handleDeleteProduct}
          products={products}
        />
        {loading && <h1>Loading Products...</h1>}
        <div style={{ padding: 10, fontSize: 20 }}>
          TOTAL : {this.getcartTotal()}
        </div>
      </div>
    );
  }
}

export default App;
