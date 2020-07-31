import { TestBed, getTestBed } from '@angular/core/testing';
import { SubjectService } from './subject.service';
import {
  HttpTestingController,
  HttpClientTestingModule
} from '@angular/common/http/testing';

describe('SubjectService', () => {
  let service: SubjectService;
  let httpMock: HttpTestingController;
  let injector: TestBed;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: []
    });

    injector = getTestBed();
    service = injector.get(SubjectService);
    httpMock = injector.get(HttpTestingController);
    service.currentUser = {
      firstName: '',
      id: 1,
      lastName: '',
      password: '',
      token: '',
      username: ''
    };
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be able to retrieve subject from the API using GET', () => {
    const mockSubject = {
      description: 'description',
      id: 1,
      title: 'title',
      userId: 1
    };
    const mockSubjectId = 1;
    const mockUserId = 1;

    service.getSubjectById(mockSubjectId).subscribe((subject) => {
      expect(subject).toEqual(mockSubject);
    });
    const request = httpMock.expectOne(
      `http://localhost:51044/api/users/${mockUserId}/subjects/${mockSubjectId}`
    );
    expect(request.request.method).toBe('GET');
    request.flush(mockSubject);
  });

  it('should be able to retrieve subjects from the API using GET', () => {
    const mockSubjects = [
      {
        description: 'description',
        id: 1,
        title: 'title',
        userId: 1
      },
      {
        description: 'description',
        id: 2,
        title: 'title',
        userId: 1
      }
    ];
    const mockUserId = 1;

    service.getSubjects().subscribe((subjects) => {
      expect(subjects).toEqual(mockSubjects);
      expect(subjects.length).toBe(2);
    });
    const request = httpMock.expectOne(
      `http://localhost:51044/api/users/${mockUserId}/subjects`
    );
    expect(request.request.method).toBe('GET');
    request.flush(mockSubjects);
  });
});
