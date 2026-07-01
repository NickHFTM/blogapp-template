import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';

import { BlogDetailPage } from './blog-detail-page';

describe('BlogDetailPage', () => {
  let component: BlogDetailPage;
  let fixture: ComponentFixture<BlogDetailPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlogDetailPage],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              data: {
                blog: {
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
                },
              },
            },
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(BlogDetailPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
