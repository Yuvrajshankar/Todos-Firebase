import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, signOut, deleteUser, updateProfile } from "firebase/auth";
import { addDoc, collection, doc, getDoc, updateDoc, deleteDoc, setDoc, query, getDocs, where } from "firebase/firestore";
import { auth, db } from "./config";

// CREATE ACCOUNT (username, email, password)
export const signUp = async (username, email, password) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        await setDoc(doc(db, 'users', user.uid), {
            uid: user.uid,
            username,
            email,
        });
    } catch (error) {
        if (error.code === 'auth/email-already-in-use') {
            throw new Error('This email is already in use.');
        }
        console.error('Error signing up:', error);
        throw error;
    }
};

// LOGIN (email, password)
export const signIn = async (email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
        if (error.code === 'auth/invalid-credential') {
            throw new Error('Check credentials');
        }
        console.error('Error signing in:', error);
        throw error;
    }
};

// GOOGLE-AUTH
export const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
        const userCredential = await signInWithPopup(auth, provider);
        const user = userCredential.user;

        const userDocRef = doc(db, 'users', user.uid);
        const userDoc = await getDoc(userDocRef);
        if (!userDoc.exists()) {
            await setDoc(userDocRef, {
                uid: user.uid,
                username: user.displayName,
                email: user.email,
            });
        }

        return user;

    } catch (error) {
        console.error('Error signing in with Google:', error);
        throw error;
    }
};

// LOGOUT
export const logOut = async () => {
    try {
        await signOut(auth);
    } catch (error) {
        console.error('Error signing out:', error);
        throw error;
    }
};

// DELETE USER DATA
export const deleteUserData = async (user) => {
    try {
        // Delete all todos associated with the user
        const todosQuery = query(collection(db, 'todos'), where("uid", "==", user.uid));
        const querySnapshot = await getDocs(todosQuery);

        const deletePromises = [];
        querySnapshot.forEach(docSnapshot => {
            deletePromises.push(deleteDoc(doc(db, 'todos', docSnapshot.id)));
        });

        await Promise.all(deletePromises);

        // Delete user document from Firestore
        const userDocRef = doc(db, 'users', user.uid);
        await deleteDoc(userDocRef);

        // Delete user from Firebase Authentication
        await deleteUser(user);

        // Optionally sign out the user
        await signOut(auth);
    } catch (error) {
        console.error('Error deleting user data:', error);
        throw error;
    }
};

// GET USER DATA
export const getUserData = async (uid) => {
    try {
        const userDoc = await getDoc(doc(db, 'users', uid));
        if (userDoc.exists()) {
            return userDoc.data();
        } else {
            console.error('User document not found in Firestore.');
            return null;
        }
    } catch (error) {
        console.error('Error fetching user document:', error);
        throw error;
    }
};

// UPDATE USER PROFILE
export const updateUserProfile = async (uid, updatedData) => {
    try {
        const user = auth.currentUser;

        if (!user) {
            throw new Error("No user is currently signed in.");
        }

        // Update user profile in Firebase Authentication
        if (updatedData.username || updatedData.email) {
            await updateProfile(user, {
                displayName: updatedData.username || user.displayName,
                email: updatedData.email || user.email
            });
        }

        // Update user document in Firestore
        const userDocRef = doc(db, 'users', uid);
        await updateDoc(userDocRef, updatedData);

        return user;
    } catch (error) {
        console.error('Error updating user profile:', error);
        throw error;
    }
};
