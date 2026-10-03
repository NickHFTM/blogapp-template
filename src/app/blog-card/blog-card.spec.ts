import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { BlogCardComponent } from './blog-card';

describe('BlogCardComponent', () => {
  let component: BlogCardComponent;
  let fixture: ComponentFixture<BlogCardComponent>;

  const testBlog = {
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
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlogCardComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(BlogCardComponent);
    component = fixture.componentInstance;

    fixture.componentRef.setInput('model', testBlog);
    fixture.detectChanges();

    await fixture.whenStable();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display blog title', () => {
    const element: HTMLElement = fixture.nativeElement;

    expect(element.textContent).toContain('Test Blog');
  });

  it('should emit event on like click', () => {
    let emittedId: number | undefined;

    component.likedByMe.subscribe((id) => {
      emittedId = id;
    });

    const button: HTMLButtonElement = fixture.nativeElement.querySelector('button');

    button.click();

    expect(emittedId).toBe(1);
  });
});
