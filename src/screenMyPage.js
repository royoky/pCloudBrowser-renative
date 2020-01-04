import React, { useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Theme from './theme';
import { Button } from 'renative';
import { FlatList } from 'react-native-gesture-handler';

class ScreenMyPage extends React.Component {
    constructor() {
        super();
        this.state = {
            myState: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed',
            data: []
        };
    }

    updateState = () => this.setState({ myState: 'The state is updated' })

    render() {

        const getFilesAndFolders = () => global.client.listfolder(0).then(metadata => {
            this.setState({ data: metadata.contents });
            console.log(metadata.contents);
        })

        function Item({ title }) {
            console.log({ title });
            // const [data, setData] = useState([]);
            return (
                <View>
                    <Text>{title}</Text>
                </View>
            );
        }

        function Item2(item) {
            console.log(item)
            return (
                <View >
                    <Text style={styles.textH2}>
                        {item.name + " " + item.contenttype}
                    </Text>
                </View>
            );
        }

        return (
            <View style={styles.container}>
                <Text style={styles.textH2}>
                    This is my Page!
        </Text>
                <Button
                    title='get list'
                    onPress={getFilesAndFolders} />
                <View>
                    {<FlatList
                        data={this.state.data}
                        renderItem={({ item }) => Item2(item)/* <Item title={item.name + item.contenttype} /> */}
                        keyExtractor={item => item.id}
                    />
                        // this.state.data.map((content) => <Text>{content.name}</Text>)
                    }
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Theme.color1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textH2: {
        fontFamily: 'TimeBurner',
        fontSize: 20,
        marginHorizontal: 20,
        color: Theme.color4,
        justifyContent: 'center',
        alignItems: 'center',
    },
    list: {

    }
});

export default ScreenMyPage;
