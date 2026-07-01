import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { BlogCardComponent } from './blog-card';

describe('BlogCardComponent', () => {
  let component: BlogCardComponent;
  let fixture: ComponentFixture<BlogCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlogCardComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(BlogCardComponent);

    fixture.componentRef.setInput('model', {
      id: 1,
      title: 'Test Blog',
      contentPreview: 'Test content',
      author: 'Test Author',
      likes: 0,
      comments: 0,
      likedByMe: false,
      createdByMe: false,
      headerImageUrl: '',
      createdAt: '',
      updatedAt: '',
    });

    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
