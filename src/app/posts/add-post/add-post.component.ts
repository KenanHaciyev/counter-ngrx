import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Post} from '../../models/posts.model';
import {AppState} from '../../store/app.state';
import {Store} from '@ngrx/store';
import {addPost} from '../state/posts.actions';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent implements OnInit {
  postForm: FormGroup;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.postForm = new FormGroup({
      title: new FormControl(null, [
        Validators.required,
        Validators.minLength(6)
      ]),
      description: new FormControl(null, [
        Validators.required,
        Validators.minLength(8)
      ])
    });
  }

  onAddPost() {
    if (this.postForm.invalid) return;

    const post: Post = {
      title: this.postForm.value.title,
      description: this.postForm.value.description
    };

    this.store.dispatch(addPost({post}));
  }

  showDescriptionErrors(): any {
    const description = this.postForm.get('description');
    if (description?.touched && description.invalid) {
      if (description.errors?.['required']) {
        return 'Description is required';
      }

      if (description.errors?.['minlength']) {
        return `Description should be minimum ${description.errors?.['minlength'].requiredLength}, now it's
          ${description.errors?.['minlength'].actualLength}
        `;
      }
    }
  }
}
