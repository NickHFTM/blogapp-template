import { TestBed } from '@angular/core/testing';
import { vi } from 'vitest';

import { BlogStateService } from './blog-state';
import { BlogService } from '../shared/blog';
import { Blog } from '../models/blog';

describe('BlogStateService', () => {
  let service: BlogStateService;

  const blogServiceMock = {
    getAll: vi.fn(),
  };

  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();

    TestBed.configureTestingModule({
      providers: [
        BlogStateService,
        {
          provide: BlogService,
          useValue: blogServiceMock,
        },
      ],
    });

    service = TestBed.inject(BlogStateService);
  });

  it('should start with empty blogs array', () => {
    expect(service.blogs()).toEqual([]);
  });

  it('should update loading state', async () => {
    let resolveBlogs!: (blogs: Blog[]) => void;

    blogServiceMock.getAll.mockReturnValue(
      new Promise<Blog[]>((resolve) => {
        resolveBlogs = resolve;
      }),
    );

    const loadPromise = service.loadBlogs();

    expect(service.loading()).toBe(true);

    resolveBlogs([]);
    await loadPromise;

    expect(service.loading()).toBe(false);
  });

  it('should calculate blog count', async () => {
    const blogs: Blog[] = [
      {
        id: 1,
        title: 'Blog 1',
        contentPreview: 'Preview 1',
        author: 'Nick',
        likes: 0,
        comments: 0,
        likedByMe: false,
        createdByMe: false,
        createdAt: '2026-10-03',
        updatedAt: '2026-10-03',
      },
      {
        id: 2,
        title: 'Blog 2',
        contentPreview: 'Preview 2',
        author: 'Nick',
        likes: 0,
        comments: 0,
        likedByMe: false,
        createdByMe: false,
        createdAt: '2026-10-03',
        updatedAt: '2026-10-03',
      },
      {
        id: 3,
        title: 'Blog 3',
        contentPreview: 'Preview 3',
        author: 'Anna',
        likes: 0,
        comments: 0,
        likedByMe: false,
        createdByMe: false,
        createdAt: '2026-10-03',
        updatedAt: '2026-10-03',
      },
    ];

    blogServiceMock.getAll.mockResolvedValue(blogs);

    await service.loadBlogs();

    expect(service.blogCount()).toBe(3);
  });

  it('should update blogCount reactively', async () => {
    const blogs: Blog[] = [
      {
        id: 1,
        title: 'Blog 1',
        contentPreview: 'Preview 1',
        author: 'Nick',
        likes: 0,
        comments: 0,
        likedByMe: false,
        createdByMe: false,
        createdAt: '2026-10-03',
        updatedAt: '2026-10-03',
      },
      {
        id: 2,
        title: 'Blog 2',
        contentPreview: 'Preview 2',
        author: 'Nick',
        likes: 0,
        comments: 0,
        likedByMe: false,
        createdByMe: false,
        createdAt: '2026-10-03',
        updatedAt: '2026-10-03',
      },
      {
        id: 3,
        title: 'Blog 3',
        contentPreview: 'Preview 3',
        author: 'Anna',
        likes: 0,
        comments: 0,
        likedByMe: false,
        createdByMe: false,
        createdAt: '2026-10-03',
        updatedAt: '2026-10-03',
      },
    ];

    blogServiceMock.getAll.mockResolvedValue(blogs);

    await service.loadBlogs();

    expect(service.blogCount()).toBe(3);

    blogServiceMock.getAll.mockResolvedValue([]);

    await service.loadBlogs();

    expect(service.blogCount()).toBe(0);
  });

  it('should save selected author to localStorage', () => {
    const setItemSpy = vi.spyOn(Storage.prototype, 'setItem');

    service.setAuthor('Nick');

    TestBed.flushEffects();

    expect(setItemSpy).toHaveBeenCalledWith('selectedAuthor', 'Nick');
  });
});
