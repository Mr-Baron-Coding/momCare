import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import { ref, update, get, push, child, set, onValue } from "firebase/database";
import { auth, database } from "../../../../firebase";

//redux
import { useSelector, useDispatch } from "react-redux";
import { editLoggedProviderPhone } from "../../../Redux/features/providerDataSlice";

//icons
import { AntDesign } from "@expo/vector-icons";
import { Fontisto } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";

export default function ContactSection({ showContact, setShowContact }) {
  const dispatch = useDispatch();
  const reduxContactInfo = useSelector(
    (state) => state.providerData.loggedProvider
  );
  const [phone, setPhone] = useState("");
  const [phoneEdit, setPhoneEdit] = useState(false);
  const [mail, setMail] = useState("");
  const [mailEdit, setMailEdit] = useState(false);
  const [site, setSite] = useState("");
  const [siteEdit, setSiteEdit] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setMail(reduxContactInfo.mail);
    setPhone(reduxContactInfo.phone);
    setSite(reduxContactInfo.site);
  }, []);

  const editContact = (item) => {
    console.log(item);
    let ob = {};
    ob[item.type] = item.field;
    update(ref(database, "users/providers/" + auth.currentUser.uid), ob)
    .then(() => {
      dispatch(editLoggedProviderPhone(item));
    })
    .then(() => {
      console.log(item.type + ' saved');
      item.type === 'phone' && setPhoneEdit(false);
      item.type === 'mail' && setMailEdit(false);
      item.type === 'site' && setSiteEdit(false);
    })
    .catch((err) => {
      console.log(err);
    })
  };

  return (
    <View style={{ gap: 10 }}>
      {!phoneEdit ? (
        <View style={{flexDirection: "row", justifyContent: "space-between", height: 30, alignItems: "center"}}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
            <AntDesign name="phone" size={20} color="#562349" />
            <Text style={styles.textStyling}>{phone}</Text>
          </View>
          <TouchableOpacity onPress={() => setPhoneEdit(true)}>
            <Text style={styles.editTextStyling}>Edit</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", gap: 10 }}>
          <AntDesign name="phone" size={20} color="#562349" />
          <TextInput
            onChangeText={(text) => setPhone(text)}
            value={phone}
            placeholder="Add phone number"
            style={styles.inputformStyle}
            maxLength={10}
            inputMode="numeric"
            keyboardType="numeric"
          />
          <TouchableOpacity onPress={ () => editContact({type: 'phone', field: phone}) }><Text style={styles.editTextStyling}>Save</Text></TouchableOpacity>
        </View>
      )}
      {!mailEdit ? (
        <View style={{flexDirection: "row", justifyContent: "space-between", height: 30, alignItems: "center"}}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
            <Feather name="mail" size={20} color="#562349" />
            <Text style={styles.textStyling}>{mail}</Text>
          </View>
          <TouchableOpacity onPress={() => setMailEdit(true)}>
            <Text style={styles.editTextStyling}>Edit</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", gap: 10 }}>
          <TextInput
            onChangeText={(text) => setMail(text)}
            value={mail}
            placeholder="Add email"
            style={styles.inputformStyle}
          />
          <TouchableOpacity onPress={ () => editContact({type: 'mail', field: mail}) }><Text style={styles.editTextStyling}>Save</Text></TouchableOpacity>
        </View>
      )}
      {!siteEdit ? (
        <View style={{flexDirection: "row", justifyContent: "space-between", height: 30, alignItems: "center"}}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
            <Fontisto name="world-o" size={20} color="#562349" />
            <Text style={styles.textStyling}>{site}</Text>
          </View>
          <TouchableOpacity onPress={() => setSiteEdit(true)}>
            <Text style={styles.editTextStyling}>Edit</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", gap: 10 }}>
          <TextInput
            onChangeText={(text) => setSite(text)}
            value={site}
            placeholder="Add personal site"
            style={styles.inputformStyle}
          />
          <TouchableOpacity onPress={ () => editContact({type: 'site', field: site}) }><Text style={styles.editTextStyling}>Save</Text></TouchableOpacity>
        </View>
      )}

      {/* <View style={{ alignItems: "flex-end" }}>
        <TouchableOpacity
          style={styles.buttonStyle}
          onPress={() => handleSubmit()}
        >
          <Text style={styles.buttonTextStyle}>
            {loading ? (
              <ActivityIndicator size="small" color="#562349" />
            ) : (
              "Save"
            )}
          </Text>
        </TouchableOpacity>
      </View> */}
    </View>
  );
}

const styles = StyleSheet.create({
  inputformStyle: {
    width: "80%",
    fontFamily: "Poppins_400Regular",
    backgroundColor: "white",
    paddingHorizontal: 15,
    borderColor: "#562349",
    borderWidth: 1,
    borderRadius: 10,
    // marginVertical: 10,
    height: 30,
    color: "#562349",
    fontSize: 14,
  },
  textStyling: {
    fontFamily: "Quicksand",
    fontWeight: "700",
    fontSize: 14,
    color: "#562349",
  },
  editTextStyling: {
    fontFamily: "Quicksand",
    fontWeight: "500",
    fontSize: 12,
    color: "#562349",
  },
  buttonStyle: {
    height: 30,
    width: 90,
    borderColor: "#562349",
    borderWidth: 2,
    borderRadius: 5,
    alignContent: "center",
    justifyContent: "center",
    textAlign: "center",
  },
  buttonTextStyle: {
    fontFamily: "Poppins_700bold",
    color: "#562349",
    fontSize: 14,
  },
});
