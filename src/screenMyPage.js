import React, { useState } from 'react';
import { Text, View, ScrollView, Image, StyleSheet } from 'react-native';
import Theme from './theme';
import { Button } from 'renative';
import { FlatList } from 'react-native-gesture-handler';
import theme from './theme';

class ScreenMyPage extends React.Component {
    constructor() {
        super();
        this.state = {
            myState: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed',
            data: [],
            filesWithThumbs: []
        };
    }

    updateState = () => this.setState({ myState: 'The state is updated' })

    render() {

        const getFilesAndFolders = () => global.client.listfolder(0).then(metadata => {
            this.setState({ data: metadata.contents });
            console.log("metadata.contents ====>", metadata.contents);
            const filesWithThumbs = withThumbs(metadata.contents);
            if (filesWithThumbs) {
                const fileIds = filesWithThumbs.map(file => file.fileid);
                global.client.getthumbs(fileIds, thumb => console.log(thumb), 'auto', '128x128', (thumb) => console.log('got thumb', thumb))
                .then(thumbMap => this.setState({ filesWithThumbs: thumbMap }));
            }
        })

        const withThumbs = (contents) => {
            return contents.filter(file => file.thumb);
          }

        function ImageItem(item) {
            return (
                <View>
                    <Image style={{width: 128, height: 128}}
                        source={item.url}
                    >
                    </Image>
                </View>
            );
        }

        function Item2(item) {
            return (
                <View style={styles.container}>
                    <Text style={styles.textH3}>
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
                        renderItem={({ item }) => Item2(item)}
                        keyExtractor={item => item.id}
                    />
                    }
                </View>
                <View style={styles.gallery}>
                    {<FlatList
                        data={this.state.filesWithThumbs}
                        renderItem={({ item }) => ImageItem(item)}
                        keyExtractor={item => item.fileid.toString()}
                        numColumns={4}
                    />
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
        overflow: "scroll"
    },
    textH2: {
        fontFamily: 'TimeBurner',
        fontSize: 20,
        marginHorizontal: 20,
        color: Theme.color4,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textH3: {
        fontFamily: 'Sans',
        fontSize: 15,
        marginHorizontal: 20,
        marginTop: 5,
        color: Theme.color3,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        borderBottomWidth: 2,
        borderColor: theme.color4,
        padding: 10
    },
    gallery: {
        margin: 10,
        flexDirection: "row",
        justifyContent: "center"
    }
});

export default ScreenMyPage;
