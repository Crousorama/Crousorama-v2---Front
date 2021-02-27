import {Component, Input, OnInit} from '@angular/core';
import {NewsService} from '../../../services/news.service';
import {CountryNews} from '../../../models/news';

@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.scss']
})
export class NewsListComponent implements OnInit {

  @Input() country: string;
  news: CountryNews[] = [];
  loading = true;

  constructor(
    private newsService: NewsService
  ) {
  }

  ngOnInit(): void {
    this.newsService.getNewsForCountry(this.country).subscribe((news: CountryNews[]) => {
      this.news = news;
      this.loading = false;
    });
  }

  openArticle(news: CountryNews): void {
    window.open(news.url, '_blank');
  }

}
