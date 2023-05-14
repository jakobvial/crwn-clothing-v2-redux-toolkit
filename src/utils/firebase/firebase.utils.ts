import {initializeApp} from "firebase/app";
import {
    createUserWithEmailAndPassword,
    getAuth,
    GoogleAuthProvider,
    NextOrObserver,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signInWithPopup,
    signInWithRedirect,
    signOut,
    User
} from "firebase/auth";
import {
    collection,
    doc,
    getDoc,
    getDocs,
    getFirestore,
    query,
    QueryDocumentSnapshot,
    setDoc,
    writeBatch
} from "firebase/firestore";
import {Category} from "../../store/categories/category.types";

const firebaseConfig = {
    apiKey: "AIzaSyCQqxmkap-_Aw1bqPjr4Lp9eQBEN6m9Pu8",
    authDomain: "crwn-clothing-db-a1381.firebaseapp.com",
    projectId: "crwn-clothing-db-a1381",
    storageBucket: "crwn-clothing-db-a1381.appspot.com",
    messagingSenderId: "914865878466",
    appId: "1:914865878466:web:9f12a210f192572e14525b"
};

const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
    prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () =>
    signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () =>
    signInWithRedirect(auth, googleProvider);

export const db = getFirestore();

export type ObjectToAdd = {
    title: string,
}

export const addCollectionAndDocuments = async <T extends ObjectToAdd>(
    collectionKey: string,
    objectsToAdd: T[]
): Promise<void> => {
    const collectionRef = collection(db, collectionKey);

    const batch = writeBatch(db);
    objectsToAdd.forEach((object) => {
        const docRef = doc(collectionRef, object.title.toLowerCase());
        batch.set(docRef, object);
    });

    await batch.commit();
    console.log("done");
};

export const getCategoriesAndDocuments = async (): Promise<Category[]> => {
    const collectionRef = collection(db, "categories");
    const q = query(collectionRef);

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((docSnapshot) => docSnapshot.data() as Category);
};

export type AdditionalInformation = {
    displayName?: string,
}

export type UserData = {
    displayName: string,
    email: string,
    createdAt: Date,
}

export const createUserDocumentFromAuth = async (
    user: User,
    additionalInformation = {} as AdditionalInformation
): Promise<QueryDocumentSnapshot<UserData> | void> => {
    // Checking if we have an authenticated user
    if (!user) return;

    // Get user reference from the Firestore instance
    const userDocRef = doc(db, "users", user.uid);

    // With the reference, if it exists, get the document matching the reference
    const userSnapshot = await getDoc(userDocRef);

    if (!userSnapshot.exists()) {
        const {displayName, email} = user;
        const createdAt = new Date();
        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
                ...additionalInformation // Adds properties and overwrites any of the above in case of duplicates
            });
        } catch (error) { // As TypeScript does not know what the error will be, we won't type it
            console.log("error creating the user", error);
        }
    }
    return userSnapshot as QueryDocumentSnapshot<UserData>;
};

export const createAuthUserWithEmailAndPassword = async (email: string, password: string) => {
    if (!email || !password) return;

    return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (email: string, password: string) => {
    if (!email || !password) return;

    return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback: NextOrObserver<User>) =>
    onAuthStateChanged(auth, callback);
