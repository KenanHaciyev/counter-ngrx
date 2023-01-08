import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {PostsState} from '../state/posts.state';
import {Store} from '@ngrx/store';
import {getPostById} from '../state/posts.selectors';
import {Post} from '../../models/posts.model';
import {Subscription} from 'rxjs';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {updatePost} from '../state/posts.actions';

@Component({
  selector: 'app-edit-posts',
  templateUrl: './edit-posts.component.html',
  styleUrls: ['./edit-posts.component.css']
})
export class EditPostsComponent implements OnInit, OnDestroy {
  post: Post;
  postSubscription: Subscription;
  postForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private store: Store<PostsState>,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id')!;
      this.postSubscription = this.store
        .select(getPostById, {id})
        .subscribe((data) => {
          this.post = data!;
          this.createForm();
        });
    });
  }

  ngOnDestroy(): void {
    if (this.postSubscription) this.postSubscription.unsubscribe();
  }

  onSubmit() {
    if (this.postForm.invalid) return;

    const title = this.postForm.value.title;
    const description = this.postForm.value.description;

    const post: Post = {
      id: this.post.id,
      title,
      description
    };

    this.store.dispatch(updatePost({post}));
    this.router.navigate(['posts']);
  }

  private createForm() {
    this.postForm = new FormGroup({
      title: new FormControl(this.post.title, [
        Validators.required,
        Validators.minLength(6)
      ]),
      description: new FormControl(this.post.description, [
        Validators.required,
        Validators.minLength(10)
      ])
    });
  }
}
