var React = require('react-native');

var Profile = require('./Profile');
var Repositories = require('./Repositories');
var Notes = require('./Notes');
var api = require('../Utils/api');

var {
    Text,
    View,
    StyleSheet,
    Image,
    TouchableHighlight
} = React;


var styles = StyleSheet.create({

    container : {
        marginTop : 65,
        flex : 1
    },
    image : {
        height : 350
    },
    buttonText : {
        fontSize : 24,
        color : 'white',
        alignSelf : 'center'
    }
});

class Dashboard extends React.Component {
    makeBackground (button) {
        var obj = {
            flexDirection : 'row',
            alignSelf : 'stretch',
            justifyContent : 'center',
            flex : 1
        };
        if (button === 0) {
            obj.backgroundColor = '#48BBEC';

        } else if (button === 1) {

            obj.backgroundColor = '#E77AAE';

        } else {

            obj.backgroundColor = '#758BF4';
        }

        return obj;
    }

    gotoProfile() {
        this.props.navigator.push({
            component: Profile,
            title: 'Profile Page',
            passProps: {
                userInfo: this.props.userInfo
            }
        });
    }

    gotoRepos() {

        api.getRepos(this.props.userInfo.login).then((repo) => {
            this.props.navigator.push({
                component: Repositories,
                title: 'Repos',
                passProps: {
                    userInfo: this.props.userInfo,
                    repos : repo
                }
            })
        });


    }

    gotoNotes() {
        console.log('gogo notes')
        api.getNotes(this.props.userInfo.login).then((notes) => {
            notes = notes || {};

            this.props.navigator.push({
                component: Notes,
                title : 'Notes',
                passProps : {
                    notes : notes,
                    userInfo : this.props.userInfo
                }
            })
        })

    }
    render() {
        return (
            <View style={styles.container}>
                <Image
                    source={{uri : this.props.userInfo.avatar_url}}
                    style={styles.image}>
                </Image>
                <TouchableHighlight
                    style={this.makeBackground(0)}
                    onPress={this.gotoProfile.bind(this)}
                    underlayColor='#88D4F5'>
                    <Text style={styles.buttonText}>
                        View Profile
                    </Text>
                </TouchableHighlight>
                <TouchableHighlight
                    style={this.makeBackground(1)}
                    onPress={this.gotoRepos.bind(this)}
                    underlayColor='#88D4F5'>
                    <Text style={styles.buttonText}>
                        View Repos
                    </Text>
                </TouchableHighlight>
                <TouchableHighlight
                    style={this.makeBackground(2)}
                    onPress={this.gotoNotes.bind(this)}
                    underlayColor='#88D4F5'>
                    <Text style={styles.buttonText}>
                        View Notes
                    </Text>
                </TouchableHighlight>
            </View>
        )
    }
}

module.exports = Dashboard;