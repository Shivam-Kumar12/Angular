import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { collection, addDoc, getDocs, doc, getDoc } from 'firebase/firestore';
import { Router } from '@angular/router';
import { getFirestore } from 'firebase/firestore';
import { Sinppet } from '../../../models/Snippet';

@Injectable({
  providedIn: 'root',
})
export class DbService {
  private db?: any;
  constructor(private authService: AuthService, private router: Router) {
    this.db = getFirestore();
  }

  async createSnippet(snippet: Sinppet) {
    try {
      const docRef = await addDoc(collection(this.db, 'snippets'), {
        ...snippet,
        by: this.authService.getUid(),
      });
      console.log('Document written with ID: ', docRef.id);
      this.router.navigate(['/']);
    } catch (e) {
      console.error('Error adding document: ', e);
      alert('error while creating');
    }
  }
  async getAllSnippet() {
    let result: any[] = []
    const querySnapshot = await getDocs(collection(this.db, "snippets"));
    querySnapshot.forEach((doc) => {
      console.log(`${doc.id}=>${doc.data()}`);

      result.push({ id: doc.id, ...doc.data() })
    });
    return result
  }
  async getSnippetById(docId: string) {

    const docRef = doc(this.db, "snippets",docId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      return docSnap.data()
    } else {
      // docSnap.data() will be undefined in this case
      return {
        id:"1",
        title:"non found",
        code:"not found"
      }
    }
  }
}
