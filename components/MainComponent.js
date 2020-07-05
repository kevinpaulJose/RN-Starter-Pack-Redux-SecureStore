import React from 'react';
import { Text, TextInput, View, ScrollView } from 'react-native';
import {Input, Button, Icon} from 'react-native-elements';
import {connect} from 'react-redux';
import {fetchData, saveData, deleteData} from '../redux/ActionCreators';
import * as SecureStore from 'expo-secure-store';



const mapStateToProps = state => {
    return {
        data: state.data
    }
}

const mapDispatchToProps = dispatch => ({
    fetchData: () => dispatch(fetchData()),
    saveData: (data) => dispatch(saveData(data)),
    deleteData: () => dispatch(deleteData())
})

class Main extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            username: '',
            password: ''
        }
    }

    componentDidMount(){
        this.props.fetchData();
        if(this.props.data.isLoading){
            this.setState({username: "loading"})
        }else {
            this.setState({username: this.props.data.data.username, password: this.props.data.data.password});
        }
    }
    handle() {
        console.log("ExEcuted")
        this.props.saveData(this.state);
    }
    render() {
        return(
            <View style={{marginTop: 50}}>
                <View>
                    <Input
                        placeholder= "Username"
                        onChangeText={(username) => this.setState({username: username})}
                        value={this.state.username}
                    />
                    <Input
                        placeholder= "Password"
                        onChangeText={(password) => this.setState({password: password})}
                        value={this.state.password}
                    />
                </View>
                <View>
                    <Button 
                        onPress={() => this.handle()}
                        title='Register'
                        clear
                        size={24} />
                </View>
                <View>
                    <Button 
                        onPress={() => this.props.deleteData()}
                        title='Delete'
                        clear
                        size={24} />
                </View>
            </View>
            
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);