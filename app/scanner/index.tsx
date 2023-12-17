import {BarCodeScanner} from 'expo-barcode-scanner'
import {View, StyleSheet, Button, Text, Pressable, Modal, TouchableOpacity, TextInput} from 'react-native'
import {ScannerContext} from '../../context/Scanner'
import {useContext, useEffect, useState} from 'react'
import {dominantColor, error, textDark, textLight} from "../../constants/colors";
import {Cancel} from "iconoir-react-native";
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import {PantryItemData} from "../../types/pantry-item-data";
import {PantryAPI} from "../../api/pantry-api";
import {UserAPI} from "../../api/user-api";
import {showErrorToast, showSuccessToast} from "../../util/custom-toasts";
import {ProductAPI} from "../../api/product-api";
import {ProductData} from "../../types/product-data";

export default function Scanner() {
    const {scanned, setScanned, handleBarCodeScanned, scannedProduct} = useContext(ScannerContext);
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        console.log("What is scanned product?", scannedProduct)
        if (scannedProduct !== null && scannedProduct.code !== null) {
            setModalVisible(true)
        }
    }, [scannedProduct])

    const closeModal = () => {
        setModalVisible(false);
        setScanned(false);
    }
    
    return (
        <>
            <View style={styles.container}>
                <BarCodeScanner
                    onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                    style={StyleSheet.absoluteFillObject}
                />
            </View>
            {scanned &&
                <Pressable style={styles.button} onPress={() => setScanned(false)}>
                    <Text style={styles.buttonText}>Scan Again</Text>
                </Pressable>
            }
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible && scannedProduct.name !== null && scannedProduct.code !== null}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}>
                <ProductModal closeModal={closeModal} productData={scannedProduct}/>
            </Modal>
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible && scannedProduct.name === null && scannedProduct.code !== null}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}>
                <AddEntryModal scannedProductCode={scannedProduct.code} closeModal={closeModal} />
            </Modal>
        </>
    )
}

const AddEntryModal = ({scannedProductCode, closeModal}) => {
    const { control, handleSubmit, formState: {errors, isValid} } = useForm({mode: 'onBlur'})

    const sendRequest: SubmitHandler<{productName: string}> = async data => {
        let newProduct: ProductData = {code: scannedProductCode, name: data.productName, pendingRequestGrant: true}
        await ProductAPI.requestProductToBeAdded(newProduct).then(res => {
            showSuccessToast(`Sent a request to add ${data.productName} to our system!`)
        }, err => {
            showErrorToast("We ran into an issue sending in a request, please try again later.");
        });
    }

    return (
        <View style={styles.centeredView}>
            <View style={styles.modalView}>
                <View style={styles.modalHeaderContainer}>
                    <View style={styles.modalHeaderLeft}>
                        <Text style={styles.modalHeaderText}>Request New Entry</Text>
                    </View>
                    <TouchableOpacity onPress={closeModal}>
                        <Cancel height={20} width={20} />
                    </TouchableOpacity>
                </View>
                <Text style={styles.modalText}>Oops! It doesn't look like we have that item's information stored. What is this product called?</Text>

                <Controller
                    control={control}
                    render={({field: { onChange, onBlur, value }}) => (
                        <TextInput
                            style={styles.input}
                            onBlur={onBlur}
                            onChangeText={value => onChange(value)}
                            value={value}
                        />
                    )}
                    name="productName"
                    rules={{ required: true }}
                />

                <View style={styles.buttonRow}>
                    <Pressable
                        style={[ styles.modalButton, {backgroundColor: textLight}]}
                        onPress={closeModal}>
                        <Text style={styles.buttonText}>Not right now</Text>
                    </Pressable>
                    <Pressable
                        style={ styles.modalButton }
                        onPress={handleSubmit(sendRequest)}>
                        <Text style={styles.buttonText}>Sure!</Text>
                    </Pressable>
                </View>
            </View>
        </View>
    )
}

const ProductModal = ({closeModal, productData}) => {
    let pantryItemDTO: PantryItemData = {id: null, product: null, expirationDate: null};
    const { control, handleSubmit, formState: {errors, isValid} } = useForm({mode: 'onBlur'})


    useEffect(() => {
        if (productData !== null)
            pantryItemDTO.product = productData;
    }, [productData])

    const submitPantryItem = () => {
        PantryAPI.savePantryItem(pantryItemDTO).then(response => {
            if (response.status === 200) {
                console.log(response.data)
                closeModal();
            }
        }, err => {
            console.error(err);
            closeModal();
        })
    }

    return (
        <View style={styles.centeredView}>
            <View style={styles.modalView}>
                <View style={styles.modalHeaderContainer}>
                    <View style={styles.modalHeaderLeft}>
                        <Text style={styles.modalHeaderText}>Add to Pantry</Text>
                    </View>
                    <TouchableOpacity onPress={closeModal}>
                        <Cancel height={20} width={20} />
                    </TouchableOpacity>
                </View>
                <Text style={styles.modalText}>{productData.name}</Text>
                <Text style={[styles.modalText, {color: textLight}]}>Expiration Date (Optional)</Text>
                <Controller
                    control={control}
                    render={({field: { onChange, onBlur, value }}) => (
                        <TextInput
                            style={styles.input}
                            onBlur={onBlur}
                            onChangeText={value => onChange(value)}
                            value={value}
                        />
                    )}
                    name="Expiration Date"
                    rules={{ required: true }}
                />
                <View style={styles.buttonRow}>
                    <Pressable
                        style={ styles.modalButton }
                        onPress={() => {submitPantryItem()}}>
                        <Text style={styles.buttonText}>Confirm</Text>
                    </Pressable>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingTop: 2,
        padding: 2,
        backgroundColor: 'white',
    },
    button: {
        flexDirection: "row",
        borderRadius: 6,
        alignSelf: "stretch",
        alignItems: "center",
        justifyContent: "center",
        marginVertical: 25,
        marginHorizontal: 15,
        paddingVertical: 12,
        backgroundColor: dominantColor,
        elevation: 3,
    },
    buttonText: {
        color: "white",
    },

    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 0,
    },
    modalView: {
        margin: 20,
        width: '80%',
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 25,
        alignItems: 'center',
        elevation: 3,
        justifyContent: "space-between"
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
    modalButton: {
        padding: 10,
        borderRadius: 6,
        paddingVertical: 12,
        alignItems: "center",
        justifyContent: "center",
        width: '45%',
        backgroundColor: dominantColor,
        elevation: 3,
        marginHorizontal: 25
    },
    modalText: {
        width: "95%",
        paddingBottom: 15,
    },
    modalHeaderContainer: {
        width: "100%",
        paddingTop: 5,
        paddingBottom: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    modalHeaderLeft: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    modalHeaderText: {
        color: textDark,
        fontSize: 16,
    },
    input: {
        backgroundColor: 'white',
        borderColor: textDark,
        borderWidth: StyleSheet.hairlineWidth,
        height: 40,
        width: "95%",
        padding: 10,
        marginBottom: 20,
        borderRadius: 4,
    },
})
