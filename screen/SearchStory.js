import React from "react";
import {
    Text,
    View,
    TouchableOpacity,
    TextInput,
    Image,
    StyleSheet,
    KeyboardAvoidingView,
    Alert,
    FlatList
} from "react-native";
import * as firebase from 'firebase';
import db from "../config.js";

export default class SearchStory extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            Books: [],
            lastVisibleTransaction: null,
            search: ''
        }
    }

    fetchMoreTransactions = async () => {
        var text = this.state.search.toUpperCase()
        var enteredText = text.split("")


        if (enteredText[0].toUpperCase() === 'B') {
            const query = await db.collection("transactions").where('bookId', '==', text).startAfter(this.state.lastVisibleTransaction).limit(10).get()
            query.docs.map((doc) => {
                this.setState({
                    Books: [...this.state.Books, doc.data()],
                    lastVisibleTransaction: doc
                })
            })
        }
        else if (enteredText[0].toUpperCase() === 'S') {
            const query = await db.collection("transactions").where('bookId', '==', text).startAfter(this.state.lastVisibleTransaction).limit(10).get()
            query.docs.map((doc) => {
                this.setState({
                    Books: [...this.state.Books, doc.data()],
                    lastVisibleTransaction: doc
                })
            })
        }
    }

    searchTransactions = async (text) => {
        var enteredText = text.split("")
        if (enteredText[0].toUpperCase() === 'B') {
            const transaction = await db.collection("transactions").where('Titile', '==', text).get()
            transaction.docs.map((doc) => {
                this.setState({
                    Books: [...this.state.Books, doc.data()],
                    lastVisibleTransaction: doc
                })
            })
        }
        else if (enteredText[0].toUpperCase() === 'S') {
            const transaction = await db.collection('Books').where('Author', '==', text).get()
            transaction.docs.map((doc) => {
                this.setState({
                    Books: [...this.state.Books, doc.data()],
                    lastVisibleTransaction: doc
                })
            })
        }
    }


    render() {
        return (
            <View style={{
                backgroundColor: 'blue', flex: 1,
                 marginTop: 50,
            }}>
                <View style={styles.searchBar}>
                    <TextInput
                        style={styles.bar}
                        placeholder="Type here to search"
                        onChangeText={(text) => { this.setState({ search: text }) }} />
                    <TouchableOpacity
                        style={styles.searchButton}
                        onPress={() => { this.searchTransactions(this.state.search) }}
                    >
                        <Text>Search</Text>
                    </TouchableOpacity>
                </View>
                <FlatList
                    data={this.state.Books}
                    renderItem={({ item }) => (
                        <View style={{ borderBottomWidth: 2 }}>
                            <Text>{"Title: " + item.bookId}</Text>
                            <Text>{"Author: " + item.studentId}</Text>
                        </View>
                    )}
                    keyExtractor={(item, index) => index.toString()}
                    onEndReached={this.fetchMoreTransactions}
                    onEndReachedThreshold={0.7}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {

    },
    searchBar: {
        flexDirection: 'row',
        height: 40,
        width: 'auto',
        borderWidth: 0.5,
        alignItems: 'center',
        backgroundColor: 'grey',

    },
    bar: {
        borderWidth: 2,
        height: 30,
        width: 300,
        paddingLeft: 10,
        backgroundColor: 'white',
    },
    searchButton: {
        borderWidth: 1,
        height: 30,
        width: 50,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'green'
    }
})