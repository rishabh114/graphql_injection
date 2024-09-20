import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphqlRequestComponent } from './graphql-request.component';

describe('GraphqlRequestComponent', () => {
  let component: GraphqlRequestComponent;
  let fixture: ComponentFixture<GraphqlRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GraphqlRequestComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GraphqlRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
